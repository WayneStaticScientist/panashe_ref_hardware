(function ($) {
  ("use strict");
  /*
|--------------------------------------------------------------------------
| Template Name: LogiHub
| Author: Thememarch
| Version: 1.0.0
|--------------------------------------------------------------------------
|--------------------------------------------------------------------------
| TABLE OF CONTENTS:
|--------------------------------------------------------------------------
| 01. Scripts Initialization
| 02. Preloader
| 03. Mobile Menu
| 04. Sticky Header
| 05. Dynamic Background
| 06. Swiper Slider
| 07. Modal Video
| 08. Accordian
| 09. Scroll Up
| 10. Register GSAP
| 11. Config GSAP
| 12. Right To Left Animation
| 13. Funfact Counter Animation
| 14. Reveal Image Animation
| 15. Text Animation Style One
| 16. Image Scrolling Parallax For CTA
| 17. BreadCrumb Image Effect
| 18. World Map Hotspot
| 19. Sticky Section
| 20. Tab Section


/*--------------------------------------------------------------
  01 Scripts 1nitialization
--------------------------------------------------------------*/
  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  $(function () {
    $(window).trigger("resize");
    preloader();
    mainNav();
    stickyHeader();
    dynamicBackground();
    swiperInit();
    modalVideo();
    scrollUp();
    stickySection();
  });

  $(window).on("scroll", function () {
    parallax();
    showScrollUp();
    zoomBackgroundImage();
  });

  /*-------------------------------------------------
    02. Preloader  
 --------------------------------------------------------------*/
  function preloader() {
    const inner = $(".preloader-img-inner");
    const img = inner.find("img");
    const content = $(".your-content-selector");

    const tl = gsap.timeline({
      onComplete: function () {
        $("#cs-logi-preloader").addClass("loaded");
        $("#logi-preloader")
          .delay(800)
          .fadeOut(function () {
            $(this).remove();
          });
      },
    });

    if (inner.length && img.length) {
      tl.fromTo(inner, 1, { xPercent: -110 }, { xPercent: 0, ease: "expo.inOut" });
      tl.fromTo(img, 1, { xPercent: 70 }, { xPercent: 0, ease: "expo.inOut" });


      tl.addLabel("showContent", ">").to(content, { opacity: 1, y: 0, duration: 1, ease: "expo.inOut" }, "showContent");


      content.css({ opacity: 0, y: 50 });

      setTimeout(() => {
        tl.play();
      }, 1000);
    }
  }

  /*-------------------------------------------------
    03. Mobile Menu
 --------------------------------------------------------------*/
  function mainNav() {
    $(".cs_nav").append('<span class="cs_munu_toggle"><span></span></span>');

    $(".menu-item-has-children").each(function () {
      if ($(this).find(".cs_munu_dropdown_toggle").length === 0) {
        $(this).append('<span class="cs_munu_dropdown_toggle"></span>');
      }
    });

    $(document).on("click", ".cs_munu_toggle", function () {
      $(this)
        .toggleClass("cs_toggle_active")
        .siblings(".cs_nav_list")
        .slideToggle();
    });

    // Side Nav
    $(document).on("click", ".cs_icon_btn", function () {
      $(".cs_side_header").addClass("active");
    });

    $(document).on("click", ".cs_close, .cs_side_header_overlay", function () {
      $(".cs_side_header").removeClass("active");
    });
  }

  document.querySelectorAll(".menu-item-has-children").forEach(function (menuItem) {
    menuItem.addEventListener("click", function () {
      document.querySelectorAll(".menu-item-has-children").forEach(function (item) {
        if (item !== menuItem) {
          item.classList.remove("active");
        }
      });
      this.classList.toggle("active");
    });
  });
  /*--------------------------------------------------------------
  04. Sticky Header
--------------------------------------------------------------*/
  function stickyHeader() {
    var $window = $(window);
    var lastScrollTop = 0;
    var $header = $(".cs_sticky_header");
    var headerHeight = $header.outerHeight() + 30;

    $window.on("scroll", function () {
      var windowTop = $window.scrollTop();

      if (windowTop >= headerHeight) {
        $header.addClass("cs_gescout_sticky");
      } else {
        $header.removeClass("cs_gescout_sticky cs_gescout_show");
      }

      if ($header.hasClass("cs_gescout_sticky")) {
        if (windowTop < lastScrollTop) {
          $header.addClass("cs_gescout_show");
        } else {
          $header.removeClass("cs_gescout_show");
        }
      }

      lastScrollTop = windowTop;
    });
  }
  /*--------------------------------------------------------------
  05. Dynamic Background
-------------------------------------------------------------*/
  function dynamicBackground() {
    $("[data-src]").each(function () {
      var src = $(this).attr("data-src");
      $(this).css({
        "background-image": "url(" + src + ")",
      });
    });
  }
  /*--------------------------------------------------------------    
  06. Swiper Slider
 --------------------------------------------------------------*/
  function swiperInit() {
    if ($(".hero1-slider1").length) {
      var heroSliderSwiper = new Swiper(".hero1-slider1", {
        speed: 600,
        parallax: true,
        loop: false,
        parallax: true,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        on: {
          slideChangeTransitionStart: function () {

            document
              .querySelectorAll(".swiper-slide .logi-splite")
              .forEach(function (element) {
                gsap.set(element, { clearProps: "all" });
              });
            document
              .querySelectorAll(".swiper-slide .slider-image")
              .forEach(function (element) {
                gsap.set(element, { clearProps: "all" });
              });


            const activeSlideContent = document.querySelector(
              ".swiper-slide-active .logi-splite"
            );
            const activeSlideImage = document.querySelector(
              ".swiper-slide-active .slider-image"
            );


            const childSplit = new SplitText(activeSlideContent, {
              type: "lines",
              linesClass: "split-child",
            });
            const parentSplit = new SplitText(activeSlideContent, {
              linesClass: "split-parent",
            });


            gsap.from(childSplit.lines, {
              duration: 1.5,
              yPercent: 100,
              ease: "power4",
              stagger: 0.1,
            });


            gsap.from(activeSlideImage, {
              duration: 1.5,
              opacity: 0,
              scale: 1.5,
              ease: "power3.out",
            });
          },
        },
      });


      document.querySelectorAll(".hero-thumb").forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", function () {
          heroSliderSwiper.slideTo(index);
        });
      });


      document
        .querySelectorAll(".slider-controler-item")
        .forEach((controller, index) => {
          controller.addEventListener("click", function () {
            heroSliderSwiper.slideTo(index);
          });
        });
    }

    // Hero Slider For Air Freight Page
    if ($(".hero1-slider-air").length) {
      var heroSliderSwiper = new Swiper(".hero1-slider-air", {
        speed: 600,
        parallax: true,
        autoplay: false,
        loop: true,
        parallax: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        on: {
          init: function () {
            var activeIndex = this.realIndex;
            document
              .querySelector(
                '.slider-controler-item-air[data-slide="' + activeIndex + '"]'
              )
              .classList.add("active");
          },
          slideChange: function () {
            var activeIndex = this.realIndex;

            document
              .querySelectorAll(".slider-controler-item-air")
              .forEach(function (item) {
                item.classList.remove("active");
              });

            var activeUserItem = document.querySelector(
              '.slider-controler-item-air[data-slide="' + activeIndex + '"]'
            );
            if (activeUserItem) {
              activeUserItem.classList.add("active");
            }
          },

          slideChangeTransitionStart: function () {

            document
              .querySelectorAll(".swiper-slide .logi-splite")
              .forEach(function (element) {
                gsap.set(element, { clearProps: "all" });
              });
            document
              .querySelectorAll(".swiper-slide .slider-image")
              .forEach(function (element) {
                gsap.set(element, { clearProps: "all" });
              });

            const activeSlideContent = document.querySelector(
              ".swiper-slide-active .logi-splite"
            );
            const activeSlideImage = document.querySelector(
              ".swiper-slide-active .slider-image"
            );

            const childSplit = new SplitText(activeSlideContent, {
              type: "lines",
              linesClass: "split-child",
            });
            const parentSplit = new SplitText(activeSlideContent, {
              linesClass: "split-parent",
            });

            gsap.from(childSplit.lines, {
              duration: 1.5,
              yPercent: 100,
              ease: "power4",
              stagger: 0.1,
            });

            gsap.from(activeSlideImage, {
              duration: 1.5,
              opacity: 0,
              scale: 1.5,
              ease: "power3.out",
            });
          },
        },
      });


      document
        .querySelectorAll(".slider-controler-item-air")
        .forEach(function (item) {
          item.addEventListener("click", function () {
            var slideIndex = this.getAttribute("data-slide");

            heroSliderSwiper.slideTo(slideIndex);
          });
        });
    }

    // Hero Slider For Ocean Cargo Page
    if ($(".hero-ocean-cargo-slider").length) {
      var heroSliderSwiper = new Swiper(".hero-ocean-cargo-slider", {
        speed: 600,
        parallax: true,
        autoplay: false,
        parallax: true,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next-oc",
          prevEl: ".swiper-button-prev-oc",
        },
        on: {
          slideChangeTransitionStart: function () {
            document
              .querySelectorAll(".swiper-slide .logi-splite")
              .forEach(function (element) {
                gsap.set(element, { clearProps: "all" });
              });
            document
              .querySelectorAll(".swiper-slide .slider-image")
              .forEach(function (element) {
                gsap.set(element, { clearProps: "all" });
              });

            const activeSlideContent = document.querySelector(
              ".swiper-slide-active .logi-splite"
            );
            const activeSlideImage = document.querySelector(
              ".swiper-slide-active .slider-image"
            );

            const childSplit = new SplitText(activeSlideContent, {
              type: "lines",
              linesClass: "split-child",
            });

            gsap.from(childSplit.lines, {
              duration: 1.5,
              yPercent: 100,
              opacity: 0,
              ease: "power4",
              stagger: 0.1,
              rotation: 15,
              transformOrigin: "top",
            });

            gsap.from(activeSlideImage, {
              duration: 1.5,
              opacity: 0,
              scale: 1.5,
              ease: "power3.out",
              rotation: 20,
              transformOrigin: "center",
              onComplete: () => {
                gsap.to(activeSlideImage, {
                  duration: 0.5,
                  scale: 1,
                  ease: "bounce.out",
                });
              },
            });
          },
        },
      });
    }

    // Home 1 Project Slider Scripts
    if ($(".project-slider").length) {
      var projectSliderSwiper = new Swiper(".project-slider", {
        effect: "fade",
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        scrollbar: {
          el: ".swiper-scrollbar",
          hide: false,
        },
        navigation: {
          nextEl: ".cs-ps-swiper-btn-next",
          prevEl: ".cs-ps-swiper-btn-prev",
        },
      });

      // Add click event to each thumbnail
      document.querySelectorAll(".ps-thumb").forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", function () {
          projectSliderSwiper.slideTo(index);
        });
      });
    }

    // Full Width Video Slider Scripts
    if ($(".video-slider").length) {
      var videoSliderSwiper = new Swiper(".video-slider", {
        effect: "fade",
        loop: false,
        autoplay: false,
        scrollbar: {
          el: ".swiper-scrollbar",
          hide: false,
        },
        navigation: {
          nextEl: ".cs-vs-swiper-btn-next",
          prevEl: ".cs-vs-swiper-btn-prev",
        },
      });
    }

    // Home 1 Testimonial Slider Scripts
    if ($(".home1-testi-slider1").length) {
      var testiSliderSwiper = new Swiper(".home1-testi-slider1", {
        speed: 1000,
        parallax: true,
        loop: true,
        slidesPerView: "auto",
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".home1-testi-swiper-button-next",
          prevEl: ".home1-testi-swiper-button-prev",
        },
        on: {
          init: function () {
            var activeIndex = this.realIndex;
            document
              .querySelector(
                '.cs-user-single[data-slide="' + activeIndex + '"]'
              )
              .classList.add("active");
          },
          slideChange: function () {
            var activeIndex = this.realIndex;

            document
              .querySelectorAll(".cs-user-single")
              .forEach(function (item) {
                item.classList.remove("active");
              });

            var activeUserItem = document.querySelector(
              '.cs-user-single[data-slide="' + activeIndex + '"]'
            );
            if (activeUserItem) {
              activeUserItem.classList.add("active");
            }
          },
        },
      });

      document.querySelectorAll(".home1-testi-sc").forEach((testisc, index) => {
        testisc.addEventListener("click", function () {
          testiSliderSwiper.slideToLoop(index);
        });
      });
    }

    // Home 1 Team Slider Scripts
    if ($(".home1-team-slider").length) {
      var home1TeamSlider = new Swiper(".home1-team-slider", {
        speed: 1000,
        autoplay: false,
        slidesPerView: "auto",
        spaceBetween: 32,
        loop: true,
        pagination: {
          el: ".home1-team-swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".home1-team-swiper-button-next",
          prevEl: ".home1-team-swiper-button-prev",
        },
      });
    }

    // Home 1 Blog Slider Scripts
    if ($(".home1-blog-slider").length) {
      var blogSliderSwiper = new Swiper(".home1-blog-slider", {
        speed: 1000,
        autoplay: false,
        slidesPerView: "auto",
        spaceBetween: 55,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    }
  }

  /*--------------------------------------------------------------
   07. Modal Video
--------------------------------------------------------------*/
function modalVideo() {
  $(document).on("click", ".cs_video_open", function (e) {
    e.preventDefault();
    var video = $(this).attr("href");
    video = video.split("?v=")[1].trim();
    $(".cs_video_popup_container iframe").attr("src", `https://www.youtube.com/embed/${video}`);
    $(".cs_video_popup").addClass("active");
  });
  $(document).on("click", ".cs_video_popup_close, .cs_video_popup_layer", function (e) {
    $(".cs_video_popup").removeClass("active");
    $("html").removeClass("overflow-hidden");
    $(".cs_video_popup_container iframe").attr("src", "about:blank");
    e.preventDefault();
  });
}
  /*--------------------------------------------------------------
  08. Accordian    
--------------------------------------------------------------*/
$(document).on("DOMContentLoaded", function () {
  $(".cs_accordian .cs_accordian_body").hide();
  $(document).on("click", ".cs_accordian .cs_accordian_header", function () {
    var $accordianItem = $(this).parent();

    $accordianItem.siblings().find(".cs_accordian_body").slideUp();
    $accordianItem.siblings().find(".cs_accordian_header").removeClass("active cs_icon");

    $(this).toggleClass("active cs_icon");
    $(this).next(".cs_accordian_body").slideToggle();
  });
});
  /*--------------------------------------------------------------
  09. Scroll Up
--------------------------------------------------------------*/
function scrollUp() {
  $(document).on("click", ".cs_scrollup", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 0);
  });
}
function showScrollUp() {
  let scroll = $(window).scrollTop();
  if (scroll >= 350) {
    $(".cs_scrollup").addClass("cs_scrollup_show");
  } else {
    $(".cs_scrollup").removeClass("cs_scrollup_show");
  }
}

  /*--------------------------------------------------------------
  10. Register GSAP
--------------------------------------------------------------*/

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  /*--------------------------------------------------------------
 11. Config GSAP
 --------------------------------------------------------------*/
  gsap.config({
    nullTargetWarn: false,
  });

  /*--------------------------------------------------------------
   12. Right To Left Animation
 --------------------------------------------------------------*/

  let divShowsRightSide = gsap.utils.toArray(".anim_div_ShowRightSide");
  divShowsRightSide.forEach((showsRight) => {
    gsap.set(showsRight, {
      opacity: 1,
      x: +100,
    });

    gsap.to(showsRight, {
      scrollTrigger: {
        trigger: showsRight,
        start: "top 90%",
        end: "bottom 60%",
        markers: false,
      },
      opacity: 0.2,
      x: -0,
      ease: "power2.out",
      duration: 1,
      stagger: 0.5,
    });
  });

  /*--------------------------------------------------------------
  13. Funfact Counting Animation
 --------------------------------------------------------------*/
  const count_number = gsap.utils.toArray(".cs_funfact");
  const count_id = gsap.utils.toArray(".amin_auto_count");

  if (count_number) {
    count_id.forEach((num) => {
      gsap.from(num, {
        scrollTrigger: {
          trigger: num,
          start: "top center+=200",
          markers: false,
        },
        delay: 0,
        innerText: 0,
        duration: 3,
        snap: {
          innerText: 1,
        },
        onUpdate: function () {
          num.innerText = Math.floor(num.innerText);
        },
      });
    });

    gsap.from(count_number, {
      scrollTrigger: {
        trigger: count_number,
        start: "top center+=200",
        markers: false,
      },
      duration: 0.5,
      scale: 0.1,
      opacity: 0,
      delay: 0,
      stagger: 0.1,
      ease: "elastic",
      force3D: true,
    });
  }

  /*--------------------------------------------------------------
    14. Reveal Image Animation
  --------------------------------------------------------------*/
  $(".reveal-img-wrap").each(function () {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this,
        start: "top bottom",
        end: "bottom top",
        toggleActions: "play none none none",
        scrub: false,
      },
      repeat: 0,
      delay: 0,
    });

    let inner = $(this).find(".reveal-img-inner");
    let img = $(this).find("img");

    if ($(this).hasClass("vertical")) {
      tl.fromTo(
        inner,
        1,
        { xPercent: 110 },
        { xPercent: 0, ease: Expo.easeInOut },
        0
      );
      tl.fromTo(
        img,
        1,
        { xPercent: -50 },
        { xPercent: 0, ease: Expo.easeInOut },
        0
      );
    } else if ($(this).hasClass("horizontal")) {
      tl.fromTo(
        inner,
        1,
        { xPercent: -110 },
        { xPercent: 0, ease: Expo.easeInOut },
        0
      );
      tl.fromTo(
        img,
        1,
        { xPercent: 80 },
        { xPercent: 0, ease: Expo.easeInOut },
        0
      );
    }
  });

  /*--------------------------------------------------------------
    15. Text Animation Style One
  --------------------------------------------------------------*/
  document.querySelectorAll(".logi-splite").forEach((splitElement, index) => {
    const childSplit = new SplitText(splitElement, {
      type: "lines",
      linesClass: "split-child",
    });
    const parentSplit = new SplitText(splitElement, {
      linesClass: "split-parent",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: splitElement,
        start: "top bottom",
        end: "bottom top",
        toggleActions: "play none none none",
        scrub: false,
        markers: false,
      },
      repeat: 0,
      delay: 0,
    });

    tl.from(childSplit.lines, {
      duration: 1.1,
      yPercent: 100,
      ease: "power4",
      stagger: 0.1,
    });
  });

  document.addEventListener("DOMContentLoaded", function (event) {
    const elements = document.querySelectorAll(".logi-splite-2");

    elements.forEach(element => {
      animation_text_1(element);
    });
  });

  function animation_text_1(element) {
    var newText = "";

    for (let i = 0; i < element.innerText.length; i++) {
      newText += "<div>";
      if (element.innerText[i] === " ") {
        newText += "&nbsp;";
      } else {
        newText += element.innerText[i];
      }
      newText += "</div>";
    }
    element.innerHTML = newText;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        toggleActions: "play none none none",
        scrub: false,
        markers: false,
      }
    });

    tl.fromTo(element.querySelectorAll("div"), {
      opacity: 0,
      x: -50
    }, {
      duration: 2,
      opacity: 1,
      x: 0,
      stagger: 0.003,
      ease: "elastic(1.2, 0.5)"
    });
  }
  /*--------------------------------------------------------------
  16. Image Scrolling Parallax For CTA
--------------------------------------------------------------*/
  function parallax() {
    var scroll = $(window).scrollTop();
    var screenHeight = $(window).height();

    $(".img-scroll-parallax").each(function () {
      var offset = $(this).offset().top;
      var distanceFromBottom = offset - scroll - screenHeight;

      if (offset > screenHeight) {
        $(this).css(
          "background-position",
          "center " + distanceFromBottom * 0.03 + "px"
        );
      } else {
        $(this).css("background-position", "center " + -scroll * 0.03 + "px");
      }
    });
  }

  /*--------------------------------------------------------------
  17. BreadCrumb Image Effect
  --------------------------------------------------------------*/
  function zoomBackgroundImage() {
    var scroll = $(window).scrollTop();
    var zoomLevel = 100 + scroll / 99.99;

    $(".img-scroll-object-zoom").css({
      "background-size": zoomLevel + "% auto",
    });
  }
  /*--------------------------------------------------------------
  18. World Map Hotspot
  --------------------------------------------------------------*/
  const toggleHotspot = (e) => {
    const clickedHotspot = e.target.closest(".hotspot-button").parentElement;

    clickedHotspot.classList.toggle("hotspot--selected");

    const allHotspots = document.querySelectorAll(".hotspot");
    allHotspots.forEach((hotspot) => {
      if (hotspot !== clickedHotspot) {
        hotspot.classList.remove("hotspot--selected");
      }
    });
  };

  (() => {
    const buttons = document.querySelectorAll(".hotspot-button");
    buttons.forEach((button) => {
      button.addEventListener("click", toggleHotspot);
    });
  })();
  /*--------------------------------------------------------------
  19. Sticky Section
  --------------------------------------------------------------*/
  function stickySection() {
    const stickySection = document.getElementById("StickySection");
    const scrollElements = document.getElementById("scrollElements");
    const stickyElements = document.getElementById("StickyElements");

    if (stickySection && scrollElements && stickyElements) {
      const sectionHeight = stickySection.clientHeight;
      const stickyHeight = stickyElements.clientHeight;
      const endPoint = sectionHeight - stickyHeight;

      ScrollTrigger.matchMedia({
        "(min-width: 991px)": function () {
          ScrollTrigger.create({
            trigger: stickySection,
            pin: stickyElements,
            start: "top top+=10",
            end: `top+=${endPoint} top`,
            endTrigger: scrollElements,
          });
        }
      });
    }
  }
  /*--------------------------------------------------------------
  20. Tab Content
  --------------------------------------------------------------*/
  document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".tab-content");

    const handleTabClick = (tab, event) => {
      event.preventDefault();

      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((c) => c.classList.remove("active"));

      tab.classList.add("active");
      const contentId = tab.id.replace("-tab", "-content");
      document.getElementById(contentId).classList.add("active");
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", (event) => handleTabClick(tab, event));
    });

    if (tabs.length > 0) {
      handleTabClick(tabs[0], new Event("click"));
    }
  });
})(jQuery);