let col1H = 0;
let col2H = 0;

Page({
    data:{
        images: [],
        col1: [],
        col2: [],
        loadingCount: 0,
        scrollH: 0,
        imgWidth: 0,
    },
    onLoad: function(){
        wx.getSystemInfo({
            success: (res) => {
                let ww = res.windowWidth;
                let wh = res.windowHeightl;
                let imgWidth = ww * 0.48;
                let scrollH = wh;

                this.setData({
                    scrollH: scrollH,
                    imgWidth: imgWidth,
                });

                this.loadImages();
            }
        })
    },

    loadImages: function(){
        let images = [
            { pic: "../../images/1.png", height: 0 },
            { pic: "../../images/2.png", height: 0 },
            { pic: "../../images/3.png", height: 0 },
            { pic: "../../images/4.png", height: 0 },
            { pic: "../../images/5.png", height: 0 },
            { pic: "../../images/6.png", height: 0 },
            { pic: "../../images/7.png", height: 0 },
            { pic: "../../images/8.png", height: 0 },
            { pic: "../../images/9.png", height: 0 },
            { pic: "../../images/10.png", height: 0 },
            { pic: "../../images/11.png", height: 0 },
            { pic: "../../images/12.png", height: 0 },
            { pic: "../../images/13.png", height: 0 },
            { pic: "../../images/14.png", height: 0 }
        ];
        
        let baseId = "img-" + (+new Date());

        for(let i = 0; i< images.length; i++){
            images[i].id = baseId + "-" + i;
        }

        this.setData({
            images: images,
            loadingCount: images.length,
        });
    },

    onImageLoad: function(e){
        let imageId = e.currentTarget.id;//当前加载完成图片ID
        let oImgW = e.detail.width;//原始图片的宽度
        let oImgH = e.detail.height;//原始图片的高度
        let imgWidth = this.data.imgWidth;//图片设置的宽度
        let scale = imgWidth / oImgW;//缩放比例
        let imgHeight = scale * oImgH;//图片设置的高度

        let images = this.data.images;
        let imgObj = null;

        //找到当前加载图片的对象
        for(let i = 0; i < images.length; i++){
            let img = images[i];
            if(img.id === imageId){
                imgObj = img;
                break;
            }
        }
        //图片设置的高度赋给当前加载图片
        imgObj.height = imgHeight;

        let loadingCount = this.data.loadingCount - 1;
        let col1 = this.data.col1;
        let col2 = this.data.col2;

        //判断当前图片放到哪一列
        if(col1H <= col2H){
            col1H += imgHeight;
            col1.push(imgObj);
        }else{
            col2H += imgHeight;
            col2.push(imgObj);
        }

        let data = {
            loadingCount: loadingCount,
            col1: col1,
            col2: col2
        };

        if(!loadingCount){
            data.images = [];
        }

        this.setData(data);

    }
})