import { Component, OnInit } from '@angular/core';
import { extend } from 'webdriver-js-extender';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';

@Component({
  selector: 'app-moog-ladder-filter',
  templateUrl: './moog-ladder-filter.component.html',
  styleUrls: ['./moog-ladder-filter.component.scss']
})
export class MoogLadderFilterComponent implements OnInit {

  constructor(private contextManager: AudioContextManagerService) {
  }

  ngOnInit() {
  }

}
