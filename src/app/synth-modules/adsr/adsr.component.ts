import { Component, OnInit, ViewChild, ElementRef, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-adsr',
  templateUrl: './adsr.component.html',
  styleUrls: ['./adsr.component.scss']
})
export class ADSRComponent implements OnInit {
  @HostListener('window:scroll', ['$event'])
  @ViewChild('envCanvas') public envCanvas: ElementRef;
  private ctx: CanvasRenderingContext2D;
  private points: any;
  private flagDown: boolean;
  private selectedPoint: number;
  private minDist: number;
  private lastX: any;
  private lastY: any;
  private offsetX: number;
  private offsetY: number;
  private offsetParentLeft: number;
  private offsetParentTop: number;

  public maxAttTime: number;
  public initTime: number;
  public initValue: number;
  public maxDecayTime: number;
  public minDecayTime: number;
  public initDecayTime: number;
  public sustainValue: number;
  public releaseTime: number;
  public stopOsc: boolean;
  public interruptNote: boolean;

  // NOT USED IN REAL APP
  public c: AudioContext;
  public osc: OscillatorNode;
  public gain: GainNode;
  public scrollOffsetY: number;
  public scrollOffsetX: number;


  constructor() { }

  ngOnInit() {
    this.scrollOffsetY = 0;
    this.scrollOffsetX = 0;
    console.log(this.scrollOffsetX);
    console.log(this.scrollOffsetY);
    const canvas: HTMLCanvasElement = this.envCanvas.nativeElement;
    this.offsetParentLeft = canvas.parentElement.offsetLeft;
    this.offsetParentTop = canvas.parentElement.offsetTop;
    this.ctx = canvas.getContext('2d');
    this.flagDown = false;
    this.minDist = 10;
    this.selectedPoint = 0;
    this.offsetX = this.envCanvas.nativeElement.offsetLeft;
    this.offsetY = this.envCanvas.nativeElement.offsetTop;

    this.points = [
      {
        x: 50,
        y: 50,
        radius: 10,
        color: 'red',
        id: '1'
      },
      {
        x: 180,
        y: 80,
        radius: 10,
        color: 'red',
        id: '2'
      }
    ];
    this.lastX = [this.points[0].x, this.points[1].x];
    this.lastY = [this.points[0].y, this.points[1].y];


    this.maxAttTime = this.points[1].x
    this.initTime = this.points[0].x / this.maxAttTime * 2;
    this.initValue = (canvas.height - this.points[0].y) / canvas.height * 2;

    this.maxDecayTime = canvas.width - 10;
    this.minDecayTime = this.points[0].x + 10;
    this.initDecayTime = (this.points[1].x - this.points[0].x) / canvas.width * 1;
    this.sustainValue = (canvas.height - this.points[1].y) / canvas.height * 2;

    this.releaseTime = (canvas.width - this.points[1].x) / canvas.width * 2;
    this.stopOsc = false;
    this.interruptNote = false;

    this.drawAll();

    // NOT USED IN REAL APP
    this.c = new AudioContext();
    this.osc = this.c.createOscillator();
    this.gain = this.c.createGain();

  }

  doSomething(event) {
    this.scrollOffsetY = window.pageYOffset;
    this.scrollOffsetX = window.pageXOffset;
    console.log(window.pageXOffset);
  }

  public drawAll() {
    this.ctx.clearRect(0, 0, this.envCanvas.nativeElement.width, this.envCanvas.nativeElement.height);
    for (let i = 0; i < this.points.length; i++) {
      const circle = this.points[i];
      this.ctx.beginPath();
      this.ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
      this.ctx.closePath();
      this.ctx.fillStyle = circle.color;
      this.ctx.fill();
    }
    this.ctx.strokeStyle = '#f2ede0';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.envCanvas.nativeElement.height);
    this.ctx.lineTo(this.points[0].x, this.points[0].y);
    this.ctx.lineTo(this.points[1].x, this.points[1].y);
    this.ctx.lineTo(this.envCanvas.nativeElement.width, this.envCanvas.nativeElement.height);
    this.ctx.stroke();
  }

  public isIntersect(mouse, circle) {
    return Math.sqrt((mouse.x - circle.x) ** 2 + (mouse.y - circle.y) ** 2) < circle.radius;
  }

  public selectPoint(e: MouseEvent) {
    e.stopImmediatePropagation();
    // console.log("clicked");
    const pos = {
      x: e.clientX - this.envCanvas.nativeElement.offsetLeft - this.offsetParentLeft
      + this.scrollOffsetX,
      y: e.clientY - this.envCanvas.nativeElement.offsetTop - this.offsetParentTop + this.scrollOffsetY   

    };
    this.flagDown = true;

    this.points.forEach(point => {
      if (this.isIntersect(pos, point)) {
        this.selectedPoint = point.id - 1;
      }
    });
  }

  public movePoint(e) {


    if (!this.flagDown) {
      return;
    } else {
      const mouseX = e.clientX - this.offsetX - this.offsetParentLeft + this.scrollOffsetX;
      const mouseY = e.clientY - this.offsetY - this.offsetParentTop + this.scrollOffsetY;
      const dx = mouseX - this.lastX[this.selectedPoint];
      const dy = mouseY - this.lastY[this.selectedPoint];

      this.lastX[this.selectedPoint] = mouseX;
      this.lastY[this.selectedPoint] = mouseY;

      this.points[this.selectedPoint].y += dy;
      console.log(mouseY);
      // console.log($(window).scrollTop());


      if (this.selectedPoint === 0) {
        // console.log(this.selectedPoint);
        if (this.lastX[this.selectedPoint] < this.points[1 - this.selectedPoint].x - this.minDist) {
          this.points[this.selectedPoint].x += dx;
        } else {
          this.points[this.selectedPoint].x = this.points[1 - this.selectedPoint].x + this.minDist;
          this.lastX[this.selectedPoint] = this.points[this.selectedPoint].x - 1;
        }


      }

      if (this.selectedPoint === 1) {
        // console.log(this.selectedPoint);
        if (this.lastX[this.selectedPoint] > this.points[1 - this.selectedPoint].x + this.minDist) {
          this.points[this.selectedPoint].x += dx;
        } else {
          this.points[this.selectedPoint].x = this.points[1 - this.selectedPoint].x + this.minDist;
          this.lastX[this.selectedPoint] = this.points[this.selectedPoint].x - 1;
        }

      }

      // redraw all the circles
      this.drawAll();
      this.updateAttackTime(this.points[1].x, this.points[0].x);
      this.updateAttackValue(this.points[0].y);
      this.updateDecayTime((this.points[1].x - this.points[0].x));
      this.updateSustainValue(this.points[1].y);

      this.updateReleaseTime((this.envCanvas.nativeElement.width - this.points[1].x));
    }
  }

  public fixPoint(e) {
    this.flagDown = false;
  }

  public updateAttackTime(maxValue, newValue) {
    this.maxAttTime = maxValue;
    this.initTime = newValue / this.maxAttTime * 2;
  }

  public updateAttackValue(newValue) {
    this.initValue = (this.envCanvas.nativeElement.height - newValue) / this.envCanvas.nativeElement.height * 2;
  }


  public updateDecayTime(newInterval) {
    this.initDecayTime = newInterval / this.envCanvas.nativeElement.width * 1;
  }

  public updateSustainValue(newValue) {
    this.sustainValue = (this.envCanvas.nativeElement.height - newValue) / this.envCanvas.nativeElement.height * 2;
  }


  public updateReleaseTime(newInterval) {
    this.releaseTime = newInterval / this.envCanvas.nativeElement.width * 2;
  }


  public playNote() {
    this.osc.frequency.value = 440;
    this.osc.connect(this.gain);
    this.gain.connect(this.c.destination);
    this.gain.gain.setValueAtTime(0, this.c.currentTime);
    this.gain.gain.linearRampToValueAtTime(this.initValue, this.c.currentTime + this.initTime);
    this.gain.gain.linearRampToValueAtTime(this.sustainValue, this.c.currentTime + this.initTime + this.initDecayTime);

    this.osc.start();

  }

  public stopNote() {
    this.gain.gain.cancelScheduledValues(this.c.currentTime);
    this.gain.gain.setValueAtTime(this.gain.gain.value, this.c.currentTime);
    console.log(this.releaseTime);
    this.gain.gain.linearRampToValueAtTime(0, this.c.currentTime + this.releaseTime);
    setTimeout(function () { this.osc.stop(); }, this.releaseTime * 1000);
  }

  public offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }


}
