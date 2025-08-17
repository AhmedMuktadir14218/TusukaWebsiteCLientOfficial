import { useEffect } from 'react';

interface OscillatorOptions {
  phase?: number;
  offset?: number;
  frequency?: number;
  amplitude?: number;
}

class Oscillator {
  phase: number;
  offset: number;
  frequency: number;
  amplitude: number;
  private _value: number;

  constructor(options: OscillatorOptions = {}) {
    this.phase = options.phase || 0;
    this.offset = options.offset || 0;
    this.frequency = options.frequency || 0.001;
    this.amplitude = options.amplitude || 1;
    this._value = this.offset;
  }

  update(): number {
    this.phase += this.frequency;
    this._value = this.offset + Math.sin(this.phase) * this.amplitude;
    return this._value;
  }

  value(): number {
    return this._value;
  }
}

interface NodeType {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

class Node implements NodeType {
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0;
}

interface LineOptions {
  spring: number;
}

interface CanvasCtx extends CanvasRenderingContext2D {
  running?: boolean;
  frame?: number;
}

interface PosType {
  x: number;
  y: number;
}

const E = {
  debug: true,
  friction: 0.5,
  trails: 20,
  size: 50,
  dampening: 0.25,
  tension: 0.98,
};

let ctx: CanvasCtx;
let f: Oscillator;
const pos: PosType = { x: 0, y: 0 };
let lines: Line[] = [];

class Line {
  spring: number;
  friction: number;
  nodes: Node[];

  constructor(options: LineOptions) {
    this.spring = options.spring + 0.1 * Math.random() - 0.02;
    this.friction = E.friction + 0.01 * Math.random() - 0.002;
    this.nodes = [];
    for (let i = 0; i < E.size; i++) {
      const t = new Node();
      t.x = pos.x;
      t.y = pos.y;
      this.nodes.push(t);
    }
  }

  update() {
    let e = this.spring;
    let t = this.nodes[0];
    t.vx += (pos.x - t.x) * e;
    t.vy += (pos.y - t.y) * e;
    for (let i = 0; i < this.nodes.length; i++) {
      t = this.nodes[i];
      if (i > 0) {
        const n = this.nodes[i - 1];
        t.vx += (n.x - t.x) * e;
        t.vy += (n.y - t.y) * e;
        t.vx += n.vx * E.dampening;
        t.vy += n.vy * E.dampening;
      }
      t.vx *= this.friction;
      t.vy *= this.friction;
      t.x += t.vx;
      t.y += t.vy;
      e *= E.tension;
    }
  }

  draw() {
    if (!ctx) return;
    let n = this.nodes[0].x;
    let i = this.nodes[0].y;
    ctx.beginPath();
    ctx.moveTo(n, i);
    for (let a = 1; a < this.nodes.length - 2; a++) {
      const e = this.nodes[a];
      const t = this.nodes[a + 1];
      n = 0.5 * (e.x + t.x);
      i = 0.5 * (e.y + t.y);
      ctx.quadraticCurveTo(e.x, e.y, n, i);
    }
    const e = this.nodes[this.nodes.length - 2];
    const t = this.nodes[this.nodes.length - 1];
    ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
    ctx.stroke();
    ctx.closePath();
  }
}

function useCanvasCursor() {
  const onMousemove = (e: MouseEvent | TouchEvent) => {
    const o = () => {
      lines = [];
      for (let i = 0; i < E.trails; i++) {
        lines.push(new Line({ spring: 0.4 + (i / E.trails) * 0.025 }));
      }
    };
    const c = (ev: MouseEvent | TouchEvent) => {
      if ('touches' in ev && ev.touches.length > 0) {
        pos.x = ev.touches[0].pageX;
        pos.y = ev.touches[0].pageY;
      } else if ('clientX' in ev && 'clientY' in ev) {
        pos.x = ev.clientX;
        pos.y = ev.clientY;
      }
      ev.preventDefault();
    };
    const l = (ev: TouchEvent) => {
      if (ev.touches.length === 1) {
        pos.x = ev.touches[0].pageX;
        pos.y = ev.touches[0].pageY;
      }
    };
    document.removeEventListener('mousemove', onMousemove as EventListener);
    document.removeEventListener('touchstart', onMousemove as EventListener);
    document.addEventListener('mousemove', c as EventListener);
    document.addEventListener('touchmove', c as EventListener);
    document.addEventListener('touchstart', l as EventListener);
    c(e);
    o();
    render();
  };

  const render = () => {
    if (ctx && ctx.running) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = 'hsla(' + Math.round(f.update()) + ',50%,50%,0.2)';
      ctx.lineWidth = 1;
      for (let t = 0; t < E.trails; t++) {
        lines[t].update();
        lines[t].draw();
      }
      ctx.frame!++;
      window.requestAnimationFrame(render);
    }
  };

  const resizeCanvas = () => {
    if (ctx) {
      ctx.canvas.width = window.innerWidth - 20;
      ctx.canvas.height = window.innerHeight;
    }
  };

  const renderCanvas = () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
    if (!canvas) return;
    const context = canvas.getContext('2d') as CanvasCtx | null;
    if (!context) return;
    ctx = context;
    ctx.running = true;
    ctx.frame = 1;
    f = new Oscillator({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });
    document.addEventListener('mousemove', onMousemove as EventListener);
    document.addEventListener('touchstart', onMousemove as EventListener);
    document.body.addEventListener('orientationchange', resizeCanvas as EventListener);
    window.addEventListener('resize', resizeCanvas as EventListener);
    window.addEventListener('focus', () => {
      if (ctx && !ctx.running) {
        ctx.running = true;
        render();
      }
    });
    window.addEventListener('blur', () => {
      if (ctx) ctx.running = true;
    });
    resizeCanvas();
  };

  useEffect(() => {
    renderCanvas();
    return () => {
      if (ctx) ctx.running = false;
      document.removeEventListener('mousemove', onMousemove as EventListener);
      document.removeEventListener('touchstart', onMousemove as EventListener);
      document.body.removeEventListener('orientationchange', resizeCanvas as EventListener);
      window.removeEventListener('resize', resizeCanvas as EventListener);
      // The following listeners use anonymous functions, so they can't be removed directly.
      // In a real app, you should refactor to use named functions.
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useCanvasCursor;
