let title = document.getElementById("title");
let description = document.getElementById("description");
let img = document.getElementById("image");
let addpostbtn = document.getElementById("addpost");
let addpostmodal=new bootstrap.Modal(document.getElementById("addpostmodal"));
let addpostform=document.getElementById("addpostform");
let cmntform=document.getElementById("cmntform");
let formimgview=document.getElementById("imgview");
let postscontainer=document.getElementById("posts");
let currentpost=null;
let currentindex=null;
let deleteindex=null;
let savecmnt=document.getElementById("savecmnt");
let cmntinput=document.getElementById("cmntinput");
let addcmntmodal=new bootstrap.Modal(document.getElementById("Modal2"));
let cmntsinform=document.getElementById("cmntsinform");
let allimgs=document.getElementById("allimgs");
  let imgModal = new bootstrap.Modal(document.getElementById("Modal3"));
// imgs in addpost form
img.addEventListener('change',function(){

    for (const file of this.files) {
    let shapar2=document.createElement("div");
    let img=document.createElement("img");
    img.src=URL.createObjectURL(file);
    img.className=" formimg mt-2 ms-2 border border-primary rounded";
    formimgview.appendChild(img);
    }
});
// displaying posts
let posts = [];

function displayPosts() {
    postscontainer.innerHTML="";
    posts.forEach(function(post,index){
        let card=document.createElement("div");
        card.className = " card p-3 mb-4 border-primary rounded";

        let dropdowncontainer=document.createElement("div");
        dropdowncontainer.className=" position-relative";

        let dropdown=document.createElement("div");
        dropdown.className=" dropdown position-absolute top-0 end-0 m-2";
        let dropdownbtn=document.createElement("button");
        dropdownbtn.className=" btn btn-sm btn-light border-0";
        dropdownbtn.setAttribute("data-bs-toggle", "dropdown");
        let dropdownicon=document.createElement("i");
        dropdownicon.className=" fa-solid fa-ellipsis-vertical";
        let dropdownlist=document.createElement("ul");
        dropdownlist.className=" dropdown-menu dropdown-menu-end";
        let dropdownitem1=document.createElement("li");
        let dropdownitem2=document.createElement("li");
        let dropdownedit=document.createElement("button");
        dropdownedit.className=" dropdown-item";
        dropdownedit.innerText="Edit";
        let dropdowndel=document.createElement("button");
        dropdowndel.className=" dropdown-item text-danger";
        dropdowndel.innerText="Delete";

        dropdownitem1.appendChild(dropdownedit);
        dropdownitem2.appendChild(dropdowndel);

        dropdownlist.appendChild(dropdownitem1);
        dropdownlist.appendChild(dropdownitem2);

        dropdownbtn.appendChild(dropdownicon);

        dropdown.appendChild(dropdownbtn);
        dropdown.appendChild(dropdownlist);

        dropdowncontainer.appendChild(dropdown);

        dropdownedit.addEventListener('click',function(){
            deleteindex=index;
            currentindex=index;
            title.value=post.titl;
            description.value=post.desc;
            formimgview.innerHTML = "";
            post.imgs.forEach(function(image){
                let shapar=document.createElement("div");
                shapar.className = "position-relative d-inline-block m-2";
                let img=document.createElement("img");
                img.className = "formimg mt-2 ms-2 border border-primary rounded";
                img.id="editimgs";
                img.src=image;
                let cross = document.createElement("i");
                cross.className ="fa-solid fa-circle-xmark position-absolute top-0 end-0 fs-6 text-primary crossbtn";
                cross.style.cursor = "pointer";
                 cross.addEventListener('click',function(){
                    post.imgs.splice(index, 1);
                    shapar.remove();  
                });
                shapar.appendChild(img);
                shapar.appendChild(cross);
                formimgview.appendChild(shapar);
            });
            addpostmodal.show();
        });

       

        let cardtitle=document.createElement("h3");
        cardtitle.className=" fs-1 text-center";
        cardtitle.innerText=post.titl;

        let carddesc=document.createElement("p");
        carddesc.className=" text-center text-secondary fs-4";
        carddesc.innerText=post.desc;

        let imgsbox=document.createElement("div");
        imgsbox.className+=" ";

            if(post.imgs.length==1){
                let cardimg=document.createElement("img");
                cardimg.src=post.imgs[0];
                cardimg.className += " single-img w-75 d-block m-auto pt-3";
                imgsbox.appendChild(cardimg);
            }
            else if(post.imgs.length==2){
                post.imgs.forEach(function(image){
                    let cardimg=document.createElement("img");
                    cardimg.src=image;
                    cardimg.className += " two-imgs w-50 ps-1 pt-3";
                    imgsbox.appendChild(cardimg);
                });
            }
            else if(post.imgs.length==3){
                let firstimg=document.createElement("img");
                firstimg.id="firstimg";
                firstimg.className+=" w-100";
                let secondimg=document.createElement("img");
                secondimg.id="secondimg";
                secondimg.className+=" w-100 h-50";
                let thirdimg=document.createElement("img");
                thirdimg.id="thirdimg";
                thirdimg.className+=" w-100 h-50";

                firstimg.src=post.imgs[0];
                secondimg.src=post.imgs[1];
                thirdimg.src=post.imgs[2];

                let leftdiv=document.createElement("div");
                leftdiv.className+=" w-50";
                leftdiv.appendChild(firstimg);

                let rightdiv=document.createElement("div");
                rightdiv.className+=" d-flex flex-column gap-1 w-50";
                rightdiv.appendChild(secondimg);
                rightdiv.appendChild(thirdimg);

                imgsbox.appendChild(leftdiv);
                imgsbox.appendChild(rightdiv);
                imgsbox.className+=" d-flex gap-1";
                imgsbox.style.height="650px";                
            }
            else if(post.imgs.length>3){
                 let firstimg=document.createElement("img");
                firstimg.id="firstimg";
                firstimg.className+=" w-100";
                let secondimg=document.createElement("img");
                secondimg.id="secondimg";
                secondimg.className+=" w-100 h-50";
                let thirddiv=document.createElement("div");
                thirddiv.id="thirddiv";
                thirddiv.className+=" w-100 h-50";

                firstimg.src=post.imgs[0];
                secondimg.src=post.imgs[1];
                thirddiv.style.backgroundImage = `url(${post.imgs[2]})`;
                thirddiv.style.backgroundSize = "cover";
                thirddiv.style.backgroundPosition = "center";
                thirddiv.style.backgroundRepeat = "no-repeat";
                thirddiv.className = " thirddiv w-100 h-50 position-relative";

                let leftdiv=document.createElement("div");
                leftdiv.className+=" w-50";
                leftdiv.appendChild(firstimg);

                let rightdiv=document.createElement("div");
                rightdiv.className+=" d-flex flex-column gap-1 w-50";
                rightdiv.appendChild(secondimg);

                let plusbtn=document.createElement("button");
                plusbtn.id="";
                plusbtn.setAttribute("data-bs-toggle", "modal");
                plusbtn.setAttribute("data-bs-target", "#Modal3");  
                plusbtn.className =" btn text-light fs-1 plusbtn";
                let plusicon=document.createElement("i");
                plusicon.className+=" fa-solid fa-plus";

                plusbtn.appendChild(plusicon);
                plusbtn.append((post.imgs.length - 3));
                let btndiv=document.createElement("div");
                btndiv.className=" btndiv position-absolute top-50 start-50 translate-middle";
                btndiv.appendChild(plusbtn);
                thirddiv.appendChild(btndiv);
                rightdiv.appendChild(thirddiv);

                imgsbox.appendChild(leftdiv);
                imgsbox.appendChild(rightdiv);
                imgsbox.className+=" d-flex gap-1";
                imgsbox.style.height="650px"
              

            plusbtn.addEventListener("click", function(){

                allimgs.innerHTML = "";
                post.imgs.forEach(function(image){
                    let cardimg = document.createElement("img");
                    cardimg.src = image;
                    cardimg.className = "two-imgs w-50 ps-1 pt-3";
                    allimgs.appendChild(cardimg);
                });
                imgModal.show();
            });
            }
            else{
                imgsbox.innerHTML="";
            }
  
        card.appendChild(dropdowncontainer);
        card.appendChild(cardtitle);
        card.appendChild(carddesc);
        card.appendChild(imgsbox);
        let cmntbtn=document.createElement("button");
        cmntbtn.className+=" btn btn-primary p-2 w-25 ms-3 mt-3";
        cmntbtn.innerText="Add Comment";
        cmntbtn.setAttribute("data-bs-toggle", "modal");
        cmntbtn.setAttribute("data-bs-target", "#Modal2");
        
        let cmntdiv=document.createElement("div");
        cmntdiv.className+=" border border-primary rounded d-none mt-3 cmntdiv";
        post.cmnts.forEach(function(cmnt){
            let p=document.createElement("p");
            p.className+=" fs-4 ms-3";
            p.innerText=cmnt.text;

            let pt=document.createElement("p");
            pt.className+=" fs-6 text-secondary me-3";
            pt.innerText=cmnt.time;
            let eachcmnt=document.createElement("div");
            eachcmnt.className+=" d-flex justify-content-between";
            eachcmnt.appendChild(p);
            eachcmnt.appendChild(pt);
            cmntdiv.appendChild(eachcmnt);
            cmntdiv.classList.remove("d-none");
        });
        card.appendChild(cmntbtn);
        card.appendChild(cmntdiv);

        postscontainer.appendChild(card);
        dropdowndel.addEventListener('click',function(){
           posts.splice(deleteindex,1); 
           displayPosts();
        })
        deleteindex=null;
        cmntbtn.addEventListener('click',function(){
            currentpost=post;
            currentindex=index;
            cmntsinform.innerHTML="";
            post.cmnts.forEach(function(cmnt){
                let eachcmnt=document.createElement("div");
                eachcmnt.className+=" d-flex justify-content-between "
                let p=document.createElement("p");
                p.className+=" ";
                let pt=document.createElement("p");
                pt.className+=" text-secondary"
                p.innerText=cmnt.text;
                pt.innerText=cmnt.time;
                eachcmnt.appendChild(p);
                eachcmnt.appendChild(pt);
                cmntsinform.appendChild(eachcmnt);

            });
        });    
    });
}

// adding posts
addpostbtn.addEventListener("click", function () {
    if(!addpostform.checkValidity()){
        addpostform.reportValidity();
        return;
    }
    if(currentindex!=null){
        posts[currentindex].titl=title.value;
        posts[currentindex].desc=description.value;
        if(img.files.length>0){

            // posts[currentindex].imgs=[];
            for(let i=0;i<img.files.length;i++){
                posts[currentindex].imgs.push(URL.createObjectURL(img.files[i]));
            }
            currentindex=null;
        }
    }
    else{
    let post = {
        titl: "",
        desc: "",
        imgs: [],
        cmnts: [],
    };
    // Assigning Values
    post.titl = title.value;
    post.desc = description.value;
    if (img.files.length > 0) {
        for (let i = 0; i < img.files.length; i++) {
        post.imgs.push(URL.createObjectURL(img.files[i]));
        }
    }
    posts.push(post);
}
    displayPosts();
    
    addpostmodal.hide();
    addpostform.reset();

    formimgview.innerHTML="";
});
console.log(posts);
// adding comments
savecmnt.addEventListener('click',function(){
   if(!cmntform.checkValidity()){
        cmntform.reportValidity();
        return;
    }
    if(currentindex==null)return;
    let now=new Date();
    posts[currentindex].cmnts.push({
         text: cmntinput.value,
         time: now.toLocaleString()
    });
    cmntinput.value="";
    addcmntmodal.hide();
    displayPosts();
});
let closebtn=document.getElementById("closebtn");
closebtn.addEventListener('click',function(){
    addpostmodal.hide();
    addpostform.reset();
    formimgview.innerHTML="";
});