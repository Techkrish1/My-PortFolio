document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('emailform');
  form.addEventListener('submit', function(event) {
      event.preventDefault();
      let fname=form.fname.value;
      let lname=form.lname.value;
      let subject=form.subject.value;
      let msg=form.message.value;
      console.log(fname,lname);
      window.location.href=`mailto:krishgokul4002@gmail.com?subject=${encodeURIComponent(subject)}&body=I%20am%20${encodeURIComponent(fname)}%20${encodeURIComponent(lname)},%0A%09%09%09${encodeURIComponent(msg)}`;
      form.reset();
  });
});
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})();


document.addEventListener('DOMContentLoaded', function() {

  var playContainer=document.querySelectorAll('.pro-image');
  playContainer.forEach((container)=>{
    container.classList.add('playBut');
    var newElement=document.createElement("div");
    newElement.classList.add('play-symbol');
    if(window.innerWidth>600){
    newElement.innerHTML=`
    <div class='container'>
    <a class='playBut'>        
  <svg version="1.1"
     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
     x="0px" y="0px" width="100.7px" height="100.7px" viewBox="0 0 213.7 213.7" enable-background="new 0 0 213.7 213.7"
     xml:space="preserve">
  
  <polygon class='triangle' id="XMLID_18_" fill="none" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="
    73.5,62.5 148.5,105.8 73.5,149.1 "/>
    
  <circle class='circle' id="XMLID_17_" fill="none"  stroke-width="7" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" cx="106.8" cy="106.8" r="103.3"/>
  </svg>
    </a>
  </div>

    `;
  }else{
    newElement.innerHTML=`
    <div class="playbtn">
       <div class="btn-container playBut">
         <i class="fas fa-play"></i>
       </div> 
     </div>
    `;
  }
    container.appendChild(newElement);
  });

  // var proimage=document.querySelectorAll('.pro-image img');
  // proimage.forEach((img)=>{
  //   img.addEventListener('mouseover',function(){
  //     img.style.visibility='hidden';
  //   });
  // });

  var progressBars = document.querySelectorAll('.progress');
  progressBars.forEach((bar)=>{
    bar.style.width=0;
  });

  var videos=document.querySelectorAll(".pro-image");

  videos.forEach((mediaContainer)=>{
  try{
      var video=mediaContainer.querySelector('video');
      var progressBar = mediaContainer.querySelector('.progress');
      var clickImage=mediaContainer.querySelector('img');
      var playBtn=mediaContainer.querySelector('.play-symbol');
      

      video.addEventListener('timeupdate', function() {
        var value = (video.currentTime / video.duration) * 100;
        progressBar.style.width = value + '%';
      });

      mediaContainer.addEventListener('click', function() {
        videos.forEach(function(othervideoContainer) {
            if (othervideoContainer !== mediaContainer) {
                var othervideo = othervideoContainer.querySelector('.bad-dash video');
                var proimage=othervideoContainer.querySelector('img');
                var playButton=othervideoContainer.querySelector('.play-symbol');
                try{
                  proimage.classList.remove('hideProImage');
                  playButton.classList.remove('hideProImage');
                    othervideo.pause();

                }catch(err){}
            }
        });
        if(video.paused){
          clickImage.classList.add('hideProImage');
          playBtn.classList.add('hideProImage');
          video.play();
        }else{
          clickImage.classList.remove('hideProImage');
          playBtn.classList.remove('hideProImage');
          video.pause();
        }
    });
    }catch(err){
  }
  });

 
});
window.onload = function() {

  // https://firebasestorage.googleapis.com/v0/b/website-325dd.appspot.com/o/ProjectVideo%2FFood%20delivery%20website%20-%20Made%20with%20Clipchamp.mp4?alt=media&token=22d1e4c4-84e6-4eb2-a351-c9c2374f197e
  // https://firebasestorage.googleapis.com/v0/b/website-325dd.appspot.com/o/ProjectVideo%2FHomeWithVoiceAssistant.mp4?alt=media&token=2213a4e2-d909-4388-baf4-1f8e4a18f437
  // https://firebasestorage.googleapis.com/v0/b/website-325dd.appspot.com/o/ProjectVideo%2FChatApp.mp4?alt=media&token=fcdd21fd-765f-41ad-aaca-3032786c7c77
  var images = document.querySelectorAll('img[data-src]');
  
  var imageno=[6,5,4,1,2,3];
  let i=0;
  images.forEach(function(img) {
    if(i<6){
      if (navigator.onLine) {
        img.src=`https://firebasestorage.googleapis.com/v0/b/website-325dd.appspot.com/o/projectImage%2F${imageno[i]}.png?alt=media&token=09bd6c81-bf62-4a23-b181-6675248ce7bc`;
        // img.src="";
        console.log("You are online.");
      } else {
        img.src="assets/img/code-solid.svg";
        console.log("You are offline.");
      }
    }
    i++;
  });
  var videos = document.querySelectorAll('source[data-source]');
  var vidsrc=["Food%20delivery%20website%20-%20Made%20with%20Clipchamp.mp4","HomeWithVoiceAssistant.mp4","ChatApp.mp4"];
  let j=0;
  videos.forEach(function(video) {
    if(j<4){
      if (navigator.onLine) {
        video.src=`https://firebasestorage.googleapis.com/v0/b/website-325dd.appspot.com/o/ProjectVideo%2F${vidsrc[j]}?alt=media&token=22d1e4c4-84e6-4eb2-a351-c9c2374f197e`;
        video.parentElement.load();
      } else {
        video.src="assets/img/placeholder.mp4";
      }
    }
    j++;
  });
};