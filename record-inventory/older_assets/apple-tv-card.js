(()=>{"use strict";
  !function(){
    function e(e){
      let t=e.target.closest(".apple-tv-card");
      const n=t.clientWidth,
      s=t.clientHeight,a=Math.max(n,s),
      c=t.closest(".apple-tv-card-container");
      c&&(c.style.perspective=2.5*a+"px")
    }
      function t(e){
        c(e.target.closest(".apple-tv-card"))
      }
      function n(e){
        let t=e.target.closest(".apple-tv-card");
        t.querySelector(".content").focus(),
        t.classList.add("hover"),s(e)
      }
      function s(e){
        e.preventDefault();
        let t=e.target.closest(".apple-tv-card");
        if(!t.classList.contains("hover"))return;
        const n=window.matchMedia("(prefers-reduced-motion: reduce)");
        if(t.classList.contains("with-shadow")&&!t.querySelector(".shadow")&&n&&!n.matches){
          const e=document.createElement("span");
          e.classList.add("shadow"),t.prepend(e)
        }
        if(!t.querySelector(".reflection")&&n&&!n.matches){
          const e=document.createElement("span");
          e.classList.add("reflection"),t.prepend(e)
        }
        let s,c;
        if("touchmove"===e.type||"touchstart"===e.type){
          const n=e.touches[0],o=t.getBoundingClientRect();
          s=n.pageX-o.left,c=n.pageY-o.top;
          const l=document.elementFromPoint(n.pageX,n.pageY);
          if(!l||t!==l.closest(".apple-tv-card"))return void a(e)
          }
        else s=e.offsetX,c=e.offsetY;

        const o=t.clientWidth,l=t.clientHeight,
        r=(o/2-s)/o*10,
        i=-1*(l/2-c)/l*10,
        d=-1*(o/2-s)/o*10,
        p=-1*(l/2-c)/l*10,
        u=Math.max(o,l),
        h=t.closest(".apple-tv-card-container");

        h&&(h.style.perspective=2.5*u+"px"),
        n&&!n.matches&&(
          t.style.transform="translateZ(4rem) rotateY("+r+"deg) rotateX("+i+"deg) translateX("+d+"px) translateY("+p+"px)"),
        t.querySelectorAll(".parallax-content").forEach(((e,t)=>{
          if(n&&!n.matches){
            t++;const n=e.classList.contains("reverse")?.2:-.65;
            e.style.transform="scale(1.075) translateX("+d*n*t+"px) translateY("+p*n*t+"px)"
          }
        })
      );
      const f=t.querySelector(".reflection");
      f&&n&&!n.matches&&(f.style.width=1.5*u+"px",
        f.style.height=1.5*u+"px",
        f.style.margin=-.75*u+"px 0 0 "+-.75*u+"px",
        f.style.transform="translateY("+(c-l/2)+"px) translateX("+(.1*o+.8*s)+"px)");
      const m=t.querySelector(".shadow");
      if(m)if(n&&!n.matches&&c<l/3){
        const e=1/(l/3)*(l/3-c);
        m.style.opacity=e.toString(),
        m.style.boxShadow="inset 0 "+-1*e+"em .4em -.5em rgba(0,0,0,"+Math.min(e,.35)+")"
      }
      else m.style.opacity=null,m.style.boxShadow=null
    }
    function a(e){
      let t=e.target.closest(".apple-tv-card");
      t.querySelector(".content").blur(),c(t)
    }
    function c(e){
      e.classList.remove("hover"),
      e.style.transform=null,
      e.querySelectorAll(".parallax-content").forEach((e=>{
        e.style.transform=null
      })
    );
    const t=e.querySelector(".reflection");
    t&&(t.style.transform=null);
    const n=e.querySelector(".shadow");
    n&&(n.style.boxShadow=null,
      n.style.opacity=null)
    }
    document.querySelectorAll(".apple-tv-card").forEach((c=>{
      const o=c.closest(".apple-tv-card-container");
      o.querySelector(".apple-tv-card-title")||o.classList.add("no-title");
      const l=Math.max(c.clientWidth,c.clientHeight);
      c.style.fontSize=l/3.5+"px";
      const r=c.querySelector(".content");
      r.setAttribute("tabindex","0"),
      r.addEventListener("focus",e),
      r.addEventListener("blur",t),
      c.addEventListener("mouseenter",n),
      c.addEventListener("touchstart",n),
      c.addEventListener("mousemove",s),
      c.addEventListener("touchmove",s),
      c.addEventListener("mouseleave",a),
      c.addEventListener("touchend",a),
      c.addEventListener("touchcancel",a)
    })),
    window.addEventListener("resize",(function(){
      document.querySelectorAll(".apple-tv-card").forEach((e=>{
        const t=Math.max(e.clientWidth,e.clientHeight);
        e.style.fontSize=t/3.5+"px"
      }))
    }))
  }
()
})
();