import { Injectable, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { loaderSeed } from '../../../utils/loader-icon-seed';
import { iconSeed } from '../../../utils/icons-seed';

export interface AvRegisteredIcon {
  name: string;
  svg: SafeHtml;
}

@Injectable({
  providedIn: 'root'
})
export class AvIconRegistry {
  private sanitizer = inject(DomSanitizer);
  private registry = new Map<string, SafeHtml>();


  constructor() {
    this.registerIcons(loaderSeed);
    this.registerIcons(iconSeed);
  }

  /** Registra um único ícone/loader SVG */
  registerIcon(name: string, svgContent: string): void {
    const normalizedSvg = this.normalizeSvg(svgContent);
    const safeSvg = this.sanitizer.bypassSecurityTrustHtml(normalizedSvg);
    this.registry.set(name, safeSvg);
  }

  /** Registra vários ícones de uma vez */
  registerIcons(icons: Record<string, string>): void {
    Object.entries(icons).forEach(([name, svg]) => this.registerIcon(name, svg));
  }

  /** Retorna o SVG registrado como conteúdo confiável */
  getIcon(name: string): SafeHtml | undefined {
    return this.registry.get(name);
  }

  /** Retorna os nomes de todos os ícones registrados */
  getIconNames(): string[] {
    return Array.from(this.registry.keys()).sort((a, b) => a.localeCompare(b));
  }

  /** Retorna todos os ícones registrados, útil para catálogos e icon pickers */
  getIcons(): AvRegisteredIcon[] {
    return this.getIconNames().map((name) => ({
      name,
      svg: this.registry.get(name)!,
    }));
  }

  private normalizeSvg(svgContent: string): string {
    const normalizedSvg = svgContent.trim();

    if (!/^<svg(?:\s|>)/i.test(normalizedSvg)) {
      throw new Error('An icon must be registered as an SVG element.');
    }

    return normalizedSvg;
  }
}
