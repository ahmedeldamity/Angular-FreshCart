import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavBlankComponent } from '../../components/nav-blank/nav-blank.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-layout-blank',
  standalone: true,
  imports: [NavBlankComponent, RouterOutlet, FooterComponent],
  templateUrl: './layout-blank.component.html',
  styleUrl: './layout-blank.component.scss'
})
export class LayoutBlankComponent {

}
