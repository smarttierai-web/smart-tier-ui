import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar';
import { HeroComponent } from '../hero/hero';
import { ProblemSolutionComponent } from '../problem-solution/problem-solution';
import { ProcessFlowComponent } from '../process-flow/process-flow';
import { FeaturesComponent } from '../features/features';
import { FooterComponent } from '../footer/footer';

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
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class LandingComponent {}
