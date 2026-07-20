import { Component } from '@angular/core';
import { NavbarComponent } from './navbar';
import { HeroComponent } from './hero';
import { ProblemSolutionComponent } from './problem-solution';
import { ProcessFlowComponent } from './process-flow';
import { FeaturesComponent } from './features';
import { FooterComponent } from './footer';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    HeroComponent,
    ProblemSolutionComponent,
    ProcessFlowComponent,
    FeaturesComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
