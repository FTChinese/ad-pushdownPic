class BigImg {
  constructor(root, mode) {
    /**
     * @param elems: TYPE Object. The root div of a video, concluding all components for one ad video.
     */
    if(root instanceof HTMLElement) {
      this.root = root;
    } else {
      this.root = document.getElementById(root);
      console.log(this.root);
    }

    if(mode !== "prod") {
      mode = "dev";
    }



    if(this.root.querySelector("#bigPic") instanceof HTMLElement) {
      this.bigPic = this.root.querySelector("#bigPic");
    }
 
    if(this.root.querySelector("#closeBtn") instanceof HTMLElement) {
      this.close = this.root.querySelector("#closeBtn");
    }
 
    if(this.root.querySelector("#bigPicA") instanceof HTMLElement) {
      this.bigPicA = this.root.querySelector("#bigPicA");
    }

   
    if(mode === "prod") {
      console.log("prod");
      this.dynamicGetHTMLData();
    }

  } 

 
  dynamicGetHTMLData() {
    const pWin = window.parent;
    if(pWin && pWin.detailPage && pWind.bigPic) {
      this.bigPicA.href = pWin.detailPage;
      this.bigPic.src = pWin.bigPic;
    }
  }
}

export default BigImg;