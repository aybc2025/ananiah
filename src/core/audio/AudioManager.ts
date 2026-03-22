import { Howl, Howler } from 'howler';
import type { AudioManifest } from '@core/types';

// ============================================================
// AudioManager — singleton managing all game audio
// Gracefully degrades when audio files are missing.
// ============================================================

class AudioManagerClass {
  private music: Map<string, Howl> = new Map();
  private sfxSprites: Map<string, Howl> = new Map();
  private currentMusic: string | null = null;
  private manifest: AudioManifest | null = null;
  private _enabled = true;
  private _musicVolume = 0.4;
  private _sfxVolume = 0.7;

  get enabled() { return this._enabled; }
  set enabled(val: boolean) {
    this._enabled = val;
    if (!val) this.stopAll();
  }

  setMusicVolume(vol: number) {
    this._musicVolume = vol;
    this.music.forEach((howl) => howl.volume(vol));
  }

  setSfxVolume(vol: number) {
    this._sfxVolume = vol;
  }

  loadManifest(manifest: AudioManifest, basePath = '/audio') {
    this.manifest = manifest;

    // Group SFX by sprite file
    const spriteFiles = new Set<string>();
    for (const ref of Object.values(manifest.sfx)) {
      spriteFiles.add(ref.sprite);
    }

    // Load each sprite file
    for (const spriteName of spriteFiles) {
      try {
        const spriteMap: Record<string, [number, number]> = {};
        for (const [key, ref] of Object.entries(manifest.sfx)) {
          if (ref.sprite === spriteName) {
            spriteMap[key] = [ref.start, ref.duration];
          }
        }
        const howl = new Howl({
          src: [`${basePath}/sfx/${spriteName}.mp3`],
          sprite: spriteMap,
          volume: this._sfxVolume,
          preload: true,
          onloaderror: () => console.warn(`[Audio] SFX sprite "${spriteName}" not found — skipping`),
        });
        this.sfxSprites.set(spriteName, howl);
      } catch {
        console.warn(`[Audio] Failed to load sprite "${spriteName}"`);
      }
    }
  }

  /** Play a named SFX from manifest */
  playSfx(name: string) {
    if (!this._enabled || !this.manifest) return;
    const ref = this.manifest.sfx[name];
    if (!ref) return;
    const howl = this.sfxSprites.get(ref.sprite);
    howl?.play(name);
  }

  /** Play music for a scene, crossfading */
  playMusicForScene(sceneId: string, basePath = '/audio') {
    if (!this._enabled || !this.manifest) return;
    const trackId = this.manifest.music[sceneId];
    if (!trackId || trackId === this.currentMusic) return;

    // Fade out current
    if (this.currentMusic) {
      const current = this.music.get(this.currentMusic);
      current?.fade(this._musicVolume, 0, 1000);
      setTimeout(() => current?.stop(), 1000);
    }

    // Load and play new
    if (!this.music.has(trackId)) {
      try {
        const howl = new Howl({
          src: [`${basePath}/music/${trackId}.mp3`],
          loop: true,
          volume: 0,
          preload: true,
          onloaderror: () => console.warn(`[Audio] Music "${trackId}" not found — skipping`),
        });
        this.music.set(trackId, howl);
      } catch {
        console.warn(`[Audio] Failed to load music "${trackId}"`);
        return;
      }
    }

    const next = this.music.get(trackId);
    if (next) {
      next.play();
      next.fade(0, this._musicVolume, 1000);
      this.currentMusic = trackId;
    }
  }

  stopAll() {
    this.music.forEach((h) => h.stop());
    Howler.stop();
    this.currentMusic = null;
  }

  dispose() {
    this.stopAll();
    this.music.forEach((h) => h.unload());
    this.sfxSprites.forEach((h) => h.unload());
    this.music.clear();
    this.sfxSprites.clear();
  }
}

// Singleton export
export const AudioManager = new AudioManagerClass();
