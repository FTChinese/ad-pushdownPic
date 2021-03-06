import {docCookies, createCssClass} from "./helper.js";

class Switch {
  constructor(bannerObj, bigObj, mode) {
    this.bannerObj = bannerObj;
    this.bigObj = bigObj;
   
    let innerIframeId = "";
    let outerIframeId = "";
    if(window.parent && window.parent.parent) {
      if(mode != "prod") {
        mode = "dev";
        innerIframeId = "banner0Inner";
        outerIframeId = "banner0";
      } else {
        innerIframeId = window.parent.innerFrameId;
        outerIframeId = window.parent.parentId;
      }

      var innerIframe = window.parent.document.getElementById(innerIframeId);
      var outerIframe = window.parent.parent.document.getElementById(outerIframeId);
      if(innerIframe && outerIframe) {
        this.innerIframeId = innerIframeId;
        this.outerIframeId = outerIframeId;
        this.innerIframe = innerIframe;
        this.outerIframe = outerIframe;

        this.innerIframe.style.height ="90px";
        this.outerIframe.style.height ="90px";

        //注入parent和parent.parent所需的css
        this.injectCssToParents();

        //处理outerIframe的ancestor元素
        this.dealwithAncestors();
      }
      
    }
       
    this.pushDownToOpen = this.pushDownToOpen.bind(this);
    this.pullUpToClose = this.pullUpToClose.bind(this);
    this.autoOpen();
    this.clickToOpen();
    this.clickToClose();
  }
  injectCssToParents() {
    if(!(window.parent && window.parent.parent)){
      return;
    }
    const innerIframeWindowHead = window.parent.document.getElementsByTagName("head")[0];
    console.log(innerIframeWindowHead);
    const outerIframeWindowHead = window.parent.parent.document.getElementsByTagName("head")[0];
    console.log(outerIframeWindowHead);
    const switchStyle = document.createElement("style");
    switchStyle.innerHTML = ".pullup-close{-webkit-animation:shrinkToClose 1s linear;-moz-animation:shrinkToClose 1s linear;-o-animation:shrinkToClose 1s linear;animation:shrinkToClose 1s linear}.pushdown-open{-webkit-animation:pushdownToOpen 1s linear;-moz-animation:pushdownToOpen 1s linear;-o-animation:pushdownToOpen 1s linear;animation:pushdownToOpen 1s linear}@-webkit-keyframes shrinkToClose{from{width:969px;height:auto}to{width:969px;height:90px}}@-moz-keyframes shrinkToClose{from{width:969px;height:auto}to{width:969px;height:90px}}@-o-keyframes shrinkToClose{from{width:969px;height:auto}to{width:969px;height:90px}}@keyframes shrinkToClose{from{width:969px;height:auto}to{width:969px;height:90px}}@-webkit-keyframes pushdownToOpen{from{width:969px;height:90px}to{width:969px;height:auto}}@-moz-keyframes pushdownToOpen{from{width:969px;height:90px}to{width:969px;height:auto}}@-o-keyframes pushdownToOpen{from{width:969px;height:90px}to{width:969px;height:auto}}@keyframes pushdownToOpen{from{width:969px;height:90px}to{width:969px;height:auto}}";
    const switchStyleCopy = switchStyle.cloneNode(true);

    innerIframeWindowHead.appendChild(switchStyle);
    outerIframeWindowHead.appendChild(switchStyleCopy);
    console.log(innerIframeWindowHead);
    console.log(outerIframeWindowHead);
  }

 
  dealwithAncestors() {
    if(!(this.outerIframeId && this.outerIframe && this.outerIframe.parentNode )) {
      return;
    }
    
    // 将位于outerIframe的父元素上的“广告”字样移动到左上角
    const contentDivId = this.outerIframeId+'content';
    const contentDiv = this.outerIframe.parentNode;//outerIframe的父元素class="banner-content"  
    contentDiv.id = contentDivId;
    if(window.parent.parent.document.styleSheets[0]) {
      window.parent.parent.document.styleSheets[0].insertRule('#' + contentDivId + ':before { right: auto; left:0;}', 0);
    }

    //将outerIframe的一系列层级的祖先元素高度都设置为"auto"
    let ancestorDiv = contentDiv;
    const ancestorBody = window.parent.parent.document.body;
    while(ancestorDiv!=ancestorBody) {
      ancestorDiv.style.height = "auto";
      if(ancestorDiv.parentNode) {
         ancestorDiv = ancestorDiv.parentNode;
      }
    }
  }

  pushDownToOpen() {
    console.log("pushDown");
    const bigPicSection = this.bigObj.root;
    const bannerPicSection = this.bannerObj.root;
    bigPicSection.classList.remove("pullup-close");
    bigPicSection.classList.add("pushdown-open");
    bigPicSection.style.height ="90px";
    bigPicSection.style.display="block";
    bigPicSection.style.display="block";
    
    if(this.innerIframe && this.outerIframe) {
      this.innerIframe.style.height ="90px";
      this.outerIframe.style.height ="90px";
      this.innerIframe.classList.remove("pullup-close");
      this.innerIframe.classList.add("pushdown-open");
      this.outerIframe.classList.remove("pullup-close");
      this.outerIframe.classList.add("pushdown-open");
    }
    
    bannerPicSection.style.display="none";
    
    setTimeout(() => {
     // bigPicSection.style.display="none";
      bigPicSection.classList.remove("pushdown-open");
      bigPicSection.style.height= "400px";
      
      if(this.innerIframe && this.outerIframe) {
        this.innerIframe.style.height = "400px";
        this.outerIframe.style.height = "400px";
        this.innerIframe.classList.remove("pushdown-open");
        this.outerIframe.classList.remove("pushdown-open");
      }
      
    }, 1000);
    
  }
  
  pullUpToClose() {
    this.bigObj.root.classList.add("pullup-close");
    if(this.innerIframe && this.outerIframe) {
      this.innerIframe.style.height = "400px";
      this.outerIframe.style.height = "400px";
      this.innerIframe.classList.remove("pushdown-open");
      this.innerIframe.classList.add("pullup-close");
      this.outerIframe.classList.remove("pushdown-open");
      this.outerIframe.classList.add("pullup-close");
    }
    
    setTimeout(()=>{
      this.bigObj.root.style.display="none";
      this.bigObj.root.classList.remove("pullup-close");
    
      this.bannerObj.root.style.display="block";

      if(this.innerIframe && this.outerIframe) {
        this.innerIframe.style.height ="90px";
        this.outerIframe.style.height ="90px";
        this.innerIframe.classList.remove("pullup-close");
        this.outerIframe.classList.remove("pullup-close");
      }
  
    },1000);
    
}
  

  autoOpen() {
    let userCookie = docCookies.getItem("pushdownAd");
    console.log("pushdownAd="+userCookie);
    if(!userCookie) {
      window.addEventListener("load", this.pushDownToOpen, false);

      //自动下推扩展后设置cookie
      let expiredTime = new Date();
      expiredTime.setTime(expiredTime.getTime()+24*60*60*1000);
      docCookies.setItem("pushdownAd","hasLoaded",expiredTime);
    }
  }

  clickToOpen() {
    this.bannerObj.open.addEventListener("click",this.pushDownToOpen,false);
  }

  clickToClose() {
    const close = this.bigObj.close;
    
    close.addEventListener("click", this.pullUpToClose, false)
  }
  
}

export default Switch;