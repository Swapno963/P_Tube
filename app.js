var is_sorted = false;
var show_id = 1000;
// second to hour and minu
const secoToHM = (seconds) =>{
    const h = Math.round(seconds / 3600);
    const m = Math.round((seconds % 3600) / 60);

    return { h, m };
  }


// sort by view
const sort_it = () =>{
    is_sorted = true;
    showCatagoriRes(show_id);
    console.log("clicked");
}

// toggle btn
function toggleColor(button) {
    // Toggle the 'btn-danger' class to change the button color
    button.classList.toggle('btn-danger');
    console.log(button);
  }


fetch("https://openapi.programming-hero.com/api/videos/categories")
.then(res => res.json())
.then(data =>{
    showCatagori(data.data);
})

const showCatagori = (data) =>{
    const container = document.getElementById("catagori-container");
    data?.forEach(el => {
        const {category,category_id} = el;
        // console.log(category,category_id);
        const btn_div = document.createElement("div");
        // btn_div.classList.add("caagori-btn-container", "container", "d-flex", "justify-content-center", "pt-3", "pb-5");
        btn_div.innerHTML = `
        <button onClick="showCatagoriRes('${category_id}');toggleColor(this)" type="button" class="btn btn-primary toggle-btn m-3">${category}</button>
        `
        container.appendChild(btn_div);
    });
}


const showCatagoriRes = (id) =>{
    show_id = id;
    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then(res => res.json())
    .then(dt => {
        // console.log(dt.data.other);


        const card_container = document.getElementById("card-container-id");
        card_container.innerHTML = null;
       
        if(dt.data.length > 0) 
        {
            console.log( dt.data);

            // sort data
            if(is_sorted == true){
                dt.data.sort((a,b)=>{
                    const view1 = parseInt(a.others['views']);
                    const view2 = parseInt(b.others['views']);
                    return view2 - view1;
                })
                console.log( 'sot');
            }



        dt?.data?.forEach(el => {
            const col_div = document.createElement("div");
            col_div.classList.add("col");
            const {title,thumbnail} = el;
            const {verified,profile_name,profile_picture} = el.authors[0];
            const {views,posted_date} = el.others;
            const h = secoToHM(posted_date)['h'];
            const m = secoToHM(posted_date)['m'];
            // console.log(h,m);


            let vf = `
                <span>                
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-patch-check" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                    <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
                </svg>
            `;
            if(verified != true) vf = ``;
            col_div.innerHTML = `
            <div class="card">
                    <img style="height: 250px;"   class="rounded " src="${thumbnail}" class="card-img-top" alt="...">
                    <p style="margin-top: -40px; background-color: black; color: white;" class="ms-auto p-1 rounded me-2">${h}hrs ${m} minuit ago</p>
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <img style="width: 50px;" class="rounded rounded-circle " src="${profile_picture}" alt="">
                            <h5 class="card-title ps-3">${title}</h5>
                        </div>
                    
                        <div class="d-flex align-items-center">
                            <p class="card-title ps-4 pt-2">${profile_name}
                                <span>
                                ${
                                    vf
                                }
                                </span>
                            </p>
                        </div>
                    <p class="card-text ps-4">${views} Views</p>
                    </div>
                </div>
            </div>
            `
            card_container.appendChild(col_div);
        });



        // removing oppp thing
        const nothing = document.getElementById("nothing-container");
        nothing.innerHTML = null;

    }

    else{
        const nt = document.createElement("div");
        const nothing = document.getElementById("nothing-container");
        const show = document.createElement("div");
        show.classList.add("text-center")
        nothing.innerHTML = `
        
            <div class="text-center">
                <img class="pb-5  " src="Icon.png" alt="">
                
                <h2 class="">Opps, There Is No Content Hear..</h2>
            </div>
       
        `
        card_container.appendChild(nt); // remove cards
        nothing.appendChild(show);
    }
    })
}


showCatagoriRes("1000");