import { Component } from '@angular/core';
import { NavbarComponent } from './navbar';
import { HeroComponent } from './hero';
import { ProblemSolutionComponent } from './problem-solution';
import { ProcessFlowComponent } from './process-flow';
import { FeaturesComponent } from './features';
import { FooterComponent } from './footer';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    ProblemSolutionComponent,
    ProcessFlowComponent,
    FeaturesComponent,
    FooterComponent
  ],
  template: `
    <app-navbar></app-navbar>
    <main>
      <app-hero></app-hero>
      <app-problem-solution></app-problem-solution>
      <app-process-flow></app-process-flow>
      <app-features></app-features>
    </main>
    <app-footer></app-footer>
  `,
  styleUrl: './app.scss',
})
export class LandingComponent {}
