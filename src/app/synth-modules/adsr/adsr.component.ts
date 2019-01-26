import { Component, OnInit, ViewChild, ElementRef, Input, HostListener, Host } from '@angular/core';
import { runInThisContext } from 'vm';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-adsr',
  templateUrl: './adsr.component.html',
  styleUrls: ['./adsr.component.scss']
})
export class ADSRComponent implements OnInit {
  @Input() data: any;
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
  private rightMargin: number;
  private bottomMargin: number;

  // parameters
  public attackTime: number;
  public attackValue: number;
  public decayTime: number;
  public sustainValue: number;
  public releaseTime: number;
  public values: any;

  // constraints
  public maxAttTime: number;
  public maxDecayTime: number;
  public minDecayTime: number;
  public stopOsc: boolean;
  public interruptNote: boolean;

  // NOT USED IN REAL APP
  public c: AudioContext;
  public osc: OscillatorNode;
  public gain: GainNode;
  public scrollOffsetY: number;
  public scrollOffsetX: number;

  @HostListener('window:scroll', ['$event'])
  checkScroll($event) {
    this.scrollOffsetY = window.pageYOffset;
    this.scrollOffsetX = window.pageXOffset;
  }
  @HostListener('window:mousemove', ['$event'])
  moveEvent(event: MouseEvent) {
    this.movePoint(event);
  }
  @HostListener('window:mouseup', ['$event'])
  upEvent(event: MouseEvent) {
    this.fixPoint(event);
  }
  /*
@HostListener('window:mousedown', ['$event'])
  downEvent(event: MouseEvent) {
    this.selectPoint(event);
  }
  */
  // constructor(g: GainNode) {
  //   this.gain = g;
  //  }
  constructor(
    private contextManger: AudioContextManagerService,
    private messageService: MessageService) {
  }


  ngOnInit() {
    this.scrollOffsetY = 0;
    this.scrollOffsetX = 0;
    const canvas: HTMLCanvasElement = this.envCanvas.nativeElement;
    this.rightMargin = canvas.width;
    this.bottomMargin = canvas.height;
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
        x: this.data.state.attackTime,
        y: this.data.state.attackValue,
        radius: 10,
        color: 'red',
        id: '1'
      },
      {
        x: this.data.state.releaseTime,
        y: this.data.state.sustainValue,
        radius: 10,
        color: 'red',
        id: '2'
      }
    ];
    this.lastX = [this.points[0].x, this.points[1].x];
    this.lastY = [this.points[0].y, this.points[1].y];
    // constraints
    this.maxAttTime = this.points[1].x;
    this.maxDecayTime = canvas.width - 10;
    this.minDecayTime = this.points[0].x + 10;
    this.stopOsc = false;
    this.interruptNote = false;

    // parameters
    this.attackTime = Math.round(((this.points[0].x - this.minDist) / this.maxAttTime * 2) * 100) / 100;
    this.attackValue = Math.round(((canvas.height - this.points[0].y) / canvas.height * 2) * 100) / 100;
    this.sustainValue = Math.round(((canvas.height - this.points[1].y) / canvas.height * 2) * 100) / 100;
    this.releaseTime = Math.round(((canvas.width - this.points[1].x) / canvas.width * 2) * 100) / 100;
    this.decayTime = Math.round(((this.points[1].x - this.points[0].x) / canvas.width * 1) * 100) / 100;
    this.values = [this.attackTime, this.decayTime, this.sustainValue, this.releaseTime];
    this.sendMessage();
    this.drawAll();

    // NOT USED IN REAL APP
    this.c = this.contextManger.audioContext;
    this.osc = this.c.createOscillator();
    this.gain = this.c.createGain();

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
    // console.log(Math.sqrt((mouse.x - circle.x) ** 2 + (mouse.y - circle.y) ** 2) < circle.radius);
    return Math.sqrt((mouse.x - circle.x) ** 2 + (mouse.y - circle.y) ** 2) < circle.radius;
  }

  public selectPoint(e: MouseEvent) {
    e.stopImmediatePropagation();
    const pos = {
      x: e.clientX - this.envCanvas.nativeElement.offsetLeft - this.offsetParentLeft
        + this.scrollOffsetX,
      y: e.clientY - this.envCanvas.nativeElement.offsetTop - this.offsetParentTop + this.scrollOffsetY

    };

    this.points.forEach(point => {
      if (this.isIntersect(pos, point)) {
        this.flagDown = true;
        this.selectedPoint = point.id - 1;
      }
    });
  }

  public movePoint(e: MouseEvent) {

    if (!this.flagDown) {
      return;
    } else {
      const mouseX = e.clientX - this.offsetX - this.offsetParentLeft + this.scrollOffsetX;
      const mouseY = e.clientY - this.offsetY - this.offsetParentTop + this.scrollOffsetY;
      const dx = mouseX - this.lastX[this.selectedPoint];
      const dy = mouseY - this.lastY[this.selectedPoint];

      this.lastX[this.selectedPoint] = mouseX;
      this.lastY[this.selectedPoint] = mouseY;

      if (this.selectedPoint === 0) {
        if (this.lastX[this.selectedPoint] < this.points[1 - this.selectedPoint].x - this.minDist) {
          if (this.lastX[this.selectedPoint] > this.minDist) {
            this.points[this.selectedPoint].x += dx;
          } else {
            this.points[this.selectedPoint].x = this.minDist;
            this.lastX[this.selectedPoint] = this.points[this.selectedPoint].x + 1;
          }
        } else {
          this.points[this.selectedPoint].x = this.points[1 - this.selectedPoint].x - this.minDist;
          this.lastX[this.selectedPoint] = this.points[this.selectedPoint].x - 1;
        }


      }

      if (this.selectedPoint === 1) {
        if (this.lastY[this.selectedPoint] > this.minDist) {
          if (this.lastY[this.selectedPoint] < this.bottomMargin) {
            this.points[this.selectedPoint].y += dy;
          } else {
            this.points[this.selectedPoint].y = this.bottomMargin;
            this.lastY[this.selectedPoint] = this.points[this.selectedPoint].y - 1;
          }
        } else {
          this.points[this.selectedPoint].y = 10;
          this.lastY[this.selectedPoint] = this.points[this.selectedPoint].y + 1;
        }
        if (this.lastX[this.selectedPoint] > this.points[1 - this.selectedPoint].x + this.minDist) {
          if (this.lastX[this.selectedPoint] < this.rightMargin - this.minDist) {
            this.points[this.selectedPoint].x += dx;
          } else {
            this.points[this.selectedPoint].x = this.rightMargin - this.minDist;
            this.lastX[this.selectedPoint] = this.points[this.selectedPoint].x - 1;
          }
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
      this.updateADSR();
    }
  }

  public fixPoint(e: MouseEvent) {
    this.flagDown = false;
  }

  public updateADSR() {
    this.values = [this.attackTime, this.decayTime, this.sustainValue, this.releaseTime];
    this.sendMessage();
  }

  public updateAttackTime(maxValue: number, newValue: number) {
    this.maxAttTime = maxValue;
    this.attackTime = (newValue - (this.minDist - 2)) / this.maxAttTime * 2;
    this.attackTime = Math.round(this.attackTime * 100) / 100;
    // console.log(this.attackTime);
  }

  public updateAttackValue(newValue: number) {
    this.attackValue = (this.envCanvas.nativeElement.height - newValue) / this.envCanvas.nativeElement.height * 2;
  }


  public updateDecayTime(newInterval: number) {
    this.decayTime = newInterval / this.envCanvas.nativeElement.width * 1;
    this.decayTime = Math.round(this.decayTime * 100) / 100;

  }

  public updateSustainValue(newValue: number) {
    this.sustainValue = (this.envCanvas.nativeElement.height - newValue) / this.envCanvas.nativeElement.height * 2;
    this.sustainValue = Math.round(this.sustainValue * 100) / 100;

  }


  public updateReleaseTime(newInterval: number) {
    this.releaseTime = newInterval / this.envCanvas.nativeElement.width * 2;
    this.releaseTime = Math.round(this.releaseTime * 100) / 100;

  }

  // TODO remove after test
  public playNote() {
    this.osc.frequency.value = 440;
    this.osc.connect(this.gain);
    this.gain.connect(this.c.destination);
    this.gain.gain.setValueAtTime(0, this.c.currentTime);
    this.gain.gain.linearRampToValueAtTime(this.attackValue, this.c.currentTime + this.attackTime);
    this.gain.gain.linearRampToValueAtTime(this.sustainValue, this.c.currentTime + this.attackTime + this.decayTime);
    // console.log(this.attackTime);
    this.sendMessage();
    this.osc.start();

  }

  public stopNote() {
    this.gain.gain.cancelScheduledValues(this.c.currentTime);
    this.gain.gain.setValueAtTime(this.gain.gain.value, this.c.currentTime);
    console.log(this.releaseTime);
    this.gain.gain.linearRampToValueAtTime(0, this.c.currentTime + this.releaseTime);
    setTimeout(function () { this.osc.stop(); }, this.releaseTime * 1000);
  }

  public savePatch(): any {
    console.log(this.points);
    this.data.state.attackTime = this.points[0].x;
    this.data.state.attackValue = this.points[0].y;
    this.data.state.sustainValue = this.points[1].y;
    this.data.state.releaseTime = this.points[1].x;
    return this.data;
  }

  sendMessage(): void {
    this.messageService.sendMessage(this.values);
  }

  clearMessage(): void {
    this.messageService.clearMessage();
  }


}
