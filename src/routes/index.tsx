import { createFileRoute } from '@tanstack/react-router';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Heart, Sparkles, Play, Pause, Volume2, VolumeX, ArrowUpRight, Mail, Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import sky from '@/assets/dreamy-sky.jpg';
import song from '@/assets/blue.mp3.asset.json';
import kiss from '@/assets/kiss.gif.asset.json';
import pleading from '@/assets/pleading.gif.asset.json';
import crying from '@/assets/crying.gif.asset.json';
import dance from '@/assets/dance.gif.asset.json';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'A Little Love Letter — Just for You' },
    { name: 'description', content: 'One little envelope. One big question. A special love letter, just for you.' },
    { property: 'og:title', content: 'A Little Love Letter — Just for You' },
    { property: 'og:description', content: 'One little envelope. One big question. A special love letter, just for you.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Proposal,
});

const phrases = ['No', 'Are you sure?', 'Wait, reconsider!', 'Pookie please 🥺', 'Look at this face!', 'Wrong button bestie 😂', 'Say yes already 😭'];
const sparklePositions = [
  { top: '25%', left: '19%', size: 15 }, { top: '35%', left: '78%', size: 20 },
  { top: '69%', left: '17%', size: 18 }, { top: '74%', left: '82%', size: 13 },
  { top: '18%', left: '67%', size: 12 }, { top: '53%', left: '88%', size: 11 },
];

function Proposal() {
  const [stage, setStage] = useState<'intro' | 'opening' | 'question' | 'yes'>('intro');
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null);
  const [date, setDate] = useState('');
  const audio = useRef<HTMLAudioElement>(null);
  const yesButton = useRef<HTMLButtonElement>(null);
  const lastDodge = useRef(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (stage !== 'opening') return;
    const timer = window.setTimeout(() => setStage('question'), reduced ? 150 : 1600);
    return () => window.clearTimeout(timer);
  }, [stage, reduced]);

  async function playMusic() {
    const player = audio.current;
    if (!player) return;
    try { await player.play(); setAudioError(false); } catch { setPlaying(false); setAudioError(true); }
  }

  function openLetter() {
    if (stage !== 'intro') return;
    void playMusic();
    setStage('opening');
  }

  function dodge() {
    if (Date.now() - lastDodge.current < 300) return;
    lastDodge.current = Date.now();
    setAttempts(value => value + 1);
    const width = Math.min(205, window.innerWidth - 32);
    const height = 48;
    const yesRect = yesButton.current?.getBoundingClientRect();
    const minY = 110;
    const maxY = Math.max(minY, window.innerHeight - height - 65);
    let x = 16, y = minY;
    for (let i = 0; i < 20; i++) {
      x = 16 + Math.random() * Math.max(0, window.innerWidth - width - 32);
      y = minY + Math.random() * (maxY - minY);
      if (!yesRect || x + width < yesRect.left - 20 || x > yesRect.right + 20 || y + height < yesRect.top - 25 || y > yesRect.bottom + 25) break;
    }
    setNoPosition({ x, y });
  }

  useEffect(() => {
    function resetPosition() { setNoPosition(null); }
    window.addEventListener('resize', resetPosition);
    return () => window.removeEventListener('resize', resetPosition);
  }, []);

  async function sayYes() {
    setDate(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
    setStage('yes');
    if (reduced) return;
    const { default: confetti } = await import('canvas-confetti');
    const heart = confetti.shapeFromPath({ path: 'M 0 10 C -20 -5 -10 -20 0 -10 C 10 -20 20 -5 0 10 Z' });
    const canvas = document.createElement('canvas');
    canvas.width = 1; canvas.height = 1;
    const context = canvas.getContext('2d');
    const colors = ['--primary', '--gold', '--primary-foreground'].map(token => {
      const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
      if (!context) return value;
      context.clearRect(0, 0, 1, 1); context.fillStyle = value; context.fillRect(0, 0, 1, 1);
      const pixel = context.getImageData(0, 0, 1, 1).data;
      return '#' + Array.from(pixel.slice(0, 3)).map(channel => channel.toString(16).padStart(2, '0')).join('');
    });
    const options = { particleCount: 95, spread: 85, startVelocity: 48, gravity: 0.7, ticks: 240, scalar: 1.4, shapes: [heart], colors, disableForReducedMotion: true };
    void confetti({ ...options, angle: 60, origin: { x: 0, y: 0.6 } });
    void confetti({ ...options, angle: 120, origin: { x: 1, y: 0.6 } });
  }

  const reaction = attempts === 0 ? kiss : attempts < 4 ? pleading : crying;
  const isOpening = stage === 'opening';

  return (
    <main className="proposal-world">
      <img className="sky-art" src={sky} alt="" width={1536} height={1024} />
      <div className="paper-wash" />
      <audio ref={audio} src={song.url} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setAudioError(true)} />
      <header className="topbar">
        <div className="brand"><Heart size={17} strokeWidth={1.3} /> A little love letter</div>
        <div className="music-player">
          <div className={`sound-bars ${playing && !muted ? 'is-playing' : ''}`} aria-hidden="true"><span /><span /><span /><span /></div>
          <span className="song-label text-[11px] text-muted-foreground mr-2">blue · yung kai</span>
          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-muted-foreground" title={playing ? 'Pause music' : 'Play music'} aria-label={playing ? 'Pause music' : 'Play music'} onClick={() => playing ? audio.current?.pause() : void playMusic()}>{playing ? <Pause size={13} /> : <Play size={13} />}</Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-muted-foreground" title={muted ? 'Unmute music' : 'Mute music'} aria-label={muted ? 'Unmute music' : 'Mute music'} onClick={() => { const player = audio.current; if (player) { player.muted = !muted; setMuted(!muted); } }}>{muted ? <VolumeX /> : <Volume2 />}</Button>
        </div>
      </header>
      {audioError && <p role="status" className="absolute top-24 right-6 text-xs text-muted-foreground z-30">Music paused. Tap play to try again.</p>}
      {sparklePositions.map((position, i) => <Sparkles key={i} size={position.size} strokeWidth={1} className="sparkle" style={{ top: position.top, left: position.left, animationDelay: `${i * .65}s` }} />)}
      <AnimatePresence mode="wait">
        {(stage === 'intro' || isOpening) && (
          <motion.section key="intro" className="center-stage" exit={{ opacity: 0, scale: reduced ? 1 : 1.1, filter: 'blur(8px)' }} transition={{ duration: .5 }}>
            <motion.div animate={{ opacity: isOpening ? 0 : 1 }} transition={{ duration: .4 }}>
              <div className="eyebrow">For my favorite person</div>
              <h1 className="intro-title">Something just for <span className="italic text-primary">you.</span></h1>
              <p className="intro-subtitle">A little note. A lot of butterflies.<br />And something I've been meaning to ask.</p>
            </motion.div>
            <motion.div className="envelope-wrap" animate={isOpening ? { scale: [1, 1.05, 3.5], y: [0, 0, 100], rotate: 0 } : { y: reduced ? 0 : [0, -7, 0], rotate: [-2, -1, -2] }} transition={isOpening ? { duration: 1.6, times: [0, .65, 1] } : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
              <span className="envelope-doodle -left-8 -top-5 rotate-[-18deg]"><Heart size={25} strokeWidth={1} /></span>
              <span className="envelope-doodle -right-10 top-20 rotate-[18deg]"><Heart size={18} strokeWidth={1} /></span>
              <Button className="envelope-button" aria-label="A special delivery for you 💌 — Tap to open" onClick={openLetter} disabled={isOpening}>
                <span className="envelope-body" />
                <motion.span className="envelope-letter" animate={isOpening ? { y: -100 } : { y: 0 }} transition={{ delay: .65, duration: .6 }}><Heart size={28} strokeWidth={1} /></motion.span>
                <span className="envelope-front" /><span className="envelope-left" /><span className="envelope-bottom" />
                <motion.span className="envelope-flap" animate={{ rotateX: isOpening ? 180 : 0, zIndex: isOpening ? 1 : 5 }} transition={{ duration: .7, delay: .25 }} />
                <motion.span className="wax-seal" animate={isOpening ? { scale: [1, 1.2, 0], rotate: 20, opacity: 0 } : { scale: 1 }} transition={{ duration: .4 }}><Heart size={25} fill="currentColor" strokeWidth={1} /></motion.span>
                <motion.span className="envelope-address" animate={{ opacity: isOpening ? 0 : 1 }}>to you, with love</motion.span>
              </Button>
            </motion.div>
            <motion.div animate={{ opacity: isOpening ? 0 : 1 }}><p className="delivery-label">A special delivery for you 💌</p><p className="tap-label">Tap to open <ArrowUpRight size={12} /></p></motion.div>
          </motion.section>
        )}
        {stage === 'question' && (
          <motion.section key="question" className="center-stage" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .95 }} transition={{ duration: .65 }}>
            <span className="eyebrow">Okay, here goes nothing…</span>
            <div className="reaction-frame"><AnimatePresence mode="wait"><motion.img key={reaction.url} src={reaction.url} alt={attempts === 0 ? 'Two cute cats sharing kisses' : attempts < 4 ? 'A cat with pleading puppy eyes' : 'A very dramatic crying cat'} width={220} height={205} initial={{ opacity: 0, scale: .85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} /></AnimatePresence></div>
            <h1 className="proposal-title">Will you be my<br /><span className="italic text-primary">girlfriend?</span> <span className="text-[38px]">🥺</span></h1>
            <p className="text-sm text-muted-foreground mt-2">You + me. That's my favorite possibility.</p>
            <div className="answer-row">
              <motion.div animate={{ scale: Math.min(1 + attempts * .11, 1.65) }} transition={{ type: 'spring', stiffness: 260, damping: 16 }}><Button ref={yesButton} className="yes-answer" onClick={() => void sayYes()}>Yes! 💕</Button></motion.div>
              <motion.div className={noPosition ? 'fixed left-0 top-0 z-20' : ''} animate={{ x: noPosition?.x ?? 0, y: noPosition?.y ?? 0, scale: Math.max(.65, 1 - attempts * .04) }} transition={{ duration: reduced ? 0 : .18 }}>
                <Button variant="outline" className="no-answer" onPointerEnter={event => { if (event.pointerType === 'mouse') dodge(); }} onPointerDown={event => { event.preventDefault(); dodge(); }} onClick={dodge}>{attempts === 0 ? phrases[0] : phrases[1 + (attempts - 1) % (phrases.length - 1)]}</Button>
              </motion.div>
            </div>
            <p className="text-[11px] text-muted-foreground mt-4 italic" aria-live="polite">{attempts > 0 ? 'A tiny “yes” would mean a whole lot. ♡' : 'No pressure. Just a very hopeful heart. ♡'}</p>
          </motion.section>
        )}
        {stage === 'yes' && (
          <motion.section key="celebration" className="center-stage" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
            <span className="eyebrow flex items-center gap-2"><Check size={12} /> It's a yes!</span>
            <div className="reaction-frame !h-[160px] !mt-5"><img src={dance.url} alt="A happy peach cat dancing in celebration" width={220} height={205} /></div>
            <h1 className="proposal-title !text-[48px] max-sm:!text-[38px]">YAYYY!<br /><span className="italic text-primary">Officially official</span> 🥰</h1>
            <p className="text-sm text-muted-foreground mt-3 italic">“I'll nap under moonlight skies with you... ✨”</p>
            <motion.div className="keepsake" initial={{ opacity: 0, y: 30, rotate: -5 }} animate={{ opacity: 1, y: 0, rotate: -2 }} transition={{ delay: .4, duration: .7 }}>
              <Heart className="mx-auto text-primary mb-3" size={22} strokeWidth={1.4} />
              <p className="eyebrow !text-[8px]">The beginning of our little forever</p>
              <h2 className="keepsake-heading mt-2">You & me, officially.</h2>
              <p className="text-xs text-muted-foreground mt-2">{date}</p>
              <div className="border-t border-dashed mt-5 pt-4 flex justify-between text-[10px] text-muted-foreground"><span>One question. One perfect yes.</span><span>♡ us, always</span></div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
      <footer className="bottom-note"><Mail size={12} strokeWidth={1.2} /> {stage === 'yes' ? 'A little moment. A lovely beginning.' : 'Sealed with a little courage & a whole lot of love.'} <Heart size={10} strokeWidth={1.2} /></footer>
    </main>
  );
}
