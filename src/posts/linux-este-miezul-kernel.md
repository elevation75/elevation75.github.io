---
title: "Linux este ... miezul (kernel)"
description: "Linux e adesea numit „doar un kernel”. De ce e asta confuz, ce rol are kernelul și ce mai trebuie ca să rezulte un sistem de operare complet."
date: 2023-02-27
updated: 2024-09-23
category: Inițiere
cover:
  webp: /assets/img/cover-kernel.webp
  jpg: /assets/img/cover-kernel.jpg
  alt: "Ilustrație cu nucleul unui sistem de operare"
---

Linux este adesea numit doar un kernel, ceea ce poate fi un concept confuz pentru mulți utilizatori. Motivul pentru aceasta este că, în timp ce Linux este într-adevăr doar un kernel, el este și fundația unui sistem de operare complet. Pentru a înțelege acest lucru, trebuie să examinăm mai îndeaproape ce este un kernel și cum se încadrează în structura generală a unui sistem de operare.

{% image "kernel-engine", "Diagramă: nucleul sistemului de operare", "Nucleul este motorul, sistemul de operare (OS) este mașina!" %}

## Ce este un kernel?

În esență, un kernel este componenta centrală a unui sistem de operare, care se ocupă de gestionarea resurselor hardware și a interacțiunii dintre hardware și software. Kernelul Linux, dezvoltat inițial de Linus Torvalds în 1991, este unul dintre cele mai cunoscute și folosite kerneluri din lume.

Totuși, în timp ce kernelul Linux este esențial pentru funcționarea unui sistem de operare, **nu este suficient pentru a avea un sistem de operare complet**.

## De ce nu e Linux doar kernel

De exemplu, pentru a avea o interfață grafică de utilizator — precum cea pe care o găsim în majoritatea distribuțiilor Linux — este necesar să se adauge o serie de utilitare și aplicații software.

Aceste utilitare și aplicații sunt adesea dezvoltate de comunitatea open-source, care colaborează pentru a dezvolta și a îmbunătăți distribuțiile Linux. Prin urmare, atunci când vorbim despre Linux, ne referim în general la o **distribuție completă de sistem de operare**, care include atât kernelul Linux, cât și alte utilitare și aplicații software.

<div class="callout callout--tip">
  <span class="callout-icon" aria-hidden="true">💡</span>
  <div>
    <p class="callout-title">Pe scurt</p>
    <p>Kernelul e piesa care vorbește cu hardware-ul. Distribuția e tot restul: interfața, programele, managerul de pachete, documentația. Cumperi mașina, nu doar motorul.</p>
  </div>
</div>

## Concluzie

Concluzionând, deși Linux este doar un kernel, este esențial pentru funcționarea unui sistem de operare complet, iar comunitatea open-source care contribuie la dezvoltarea distribuțiilor Linux este esențială pentru a oferi o experiență de utilizare de calitate.

Următorul pas logic: [Un ocean de ... distribuții](/blog/un-ocean-de-distributii/) — de unde vin toate aceste sisteme de operare și cum alegi unul.
