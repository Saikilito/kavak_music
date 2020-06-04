$(document).ready(function(){
  
  const pathURL = '/api/v1';
  const url = window.location.pathname;
  const urlSplit = url.split('/');

 /**
  * description: Active main Carousel 
  */ 
 if(urlSplit.indexOf('home')){
    $('.slick-carousel-albums').slick({
        centerMode: true,
        prevArrow: false,
        nextArrow: false,
        dots:false,    
        infinite: true,    
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        centerPadding: '60px',
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 3
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 1
            }
          }
        ]
      });
 }
  /**
   * description: Delete album
   */ 
  const btnDeletetrack = document.querySelector(('#btn-delete-track')); 

  if(btnDeletetrack){      

      btnDeletetrack.addEventListener('click', async function deletetrack (e){        
        
        e.preventDefault();
        
        const idtrack = urlSplit[2];        
        const band = window.confirm('Are you sure want to delete this track ?');
        
        if(band){
          const response = await fetch(`${pathURL}/track/delete/${idtrack}`,{
            method: "DELETE",
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({delete: true})
          });
          const data = await response.json();
        }
      })
  }
  /**
   * description: Add Album
   */
  if(urlSplit.indexOf('albums') !== -1 && urlSplit.indexOf('add') !== -1){
    
    const addtrackForm = document.querySelector('#add-album-form');    

    addtrackForm.addEventListener('submit', async function(e){
      e.preventDefault();
      
      const iAlbumTitle = document.getElementById('album-title').value;
      const iAlbumArtist = document.getElementById('album-artist').value;
      const iAlbumUPC = document.getElementById('album-upc').value;
      const iAlbumLabel = document.getElementById('album-label').value;
      const iAlbumGenre = document.getElementById('album-genre').value;
      const iAlbumUser = document.getElementById('album-user').value;

      let data = {        
        title:iAlbumTitle,
        artist:iAlbumArtist,
        upc:iAlbumUPC,
        label:iAlbumLabel,
        genre:iAlbumGenre,
        userid:parseInt(iAlbumUser),
        status:0
      }
      
      try {
        let response = await fetch(`${pathURL}/album/add`,{
          method: "POST",
              headers:{
                'Content-Type': 'application/json'
              },
              body:JSON.stringify(data)
        })
        .then(e=>{
          alert('Album add successfully');
          addtrackForm.reset();
        })
        .catch(console.error(e));
        
    
      } catch (error) {
        console.error(error)
      }
      
    });
  }
  /**
   * description: Add Track
   */
  if(urlSplit.indexOf('tracks') !== -1 && urlSplit.indexOf('add') !== -1){

    const addTrackForm = document.querySelector('#add-track-form');    

    addTrackForm.addEventListener('submit', async function(e){
      e.preventDefault();
      
      const iTrackTitle = document.getElementById('track-title').value;
      const iTrackArtist = document.getElementById('aritst').value;
      const iTrackISRC = document.getElementById('isrc').value;      
      const iTrackGenre = document.getElementById('track-genre').value;
      const iTrackAlbum = document.getElementById('track-album').value;
      const iTrackUser = document.getElementById('track-user').value;

      let data = {        
        title:iTrackTitle,
        artist:iTrackArtist,
        isrc:iTrackISRC,
        genre:iTrackGenre,
        albumid:parseInt(iTrackAlbum),
        userid:parseInt(iTrackUser),
        status:1
      }
      
          

        let response = await fetch(`http://localhost:3000/api/v1/track/add`,{
          method: "POST",
              headers:{
                'Content-Type': 'application/json'
              },
              body:JSON.stringify(data)
        })
        .then(res=>alert("Track add successfully"))
        .catch(err=>console.error(err));
      
    });
  }

  /**
   * desciprtion: Add User
   */
  if(urlSplit.indexOf('users') !== -1 && urlSplit.indexOf('add') !== -1){
    
    const addUserForm = document.querySelector('#add-user-form');    
    addUserForm.addEventListener('submit', async function(e){
      
      e.preventDefault();
      
      const iUserName = document.getElementById('user-name').value;
      const iUserEmail = document.getElementById('user-email').value;
      const iUserCountryCode = document.getElementById('user-countrycode').value;            

      let data = {        
        name:iUserName,
        email:iUserEmail,
        countrycode:iUserCountryCode,        
        status:1
      }

      try {
        let response = await fetch(`${pathURL}/user/add`,{
          method: "POST",
              headers:{
                'Content-Type': 'application/json'
              },
              body:JSON.stringify(data)
        })
        .catch(console.error(e))
        .then(e=>{
          alert("User successfully Add");
          addUserForm.reset();
        });        
      } catch (error) {
        alert("An error occurred. Try again later.");
        console.error(error)
      }
    });
  }

   /**
   * description: Delete User
   */
  if(urlSplit.indexOf('users') !== -1 && urlSplit.length === 2){
    
    const allBtnDeleteUser = document.querySelectorAll('#btn-user-delete');
    
    allBtnDeleteUser.forEach(btnDelete=>{
      btnDelete.addEventListener('click', async function(e){
        e.preventDefault();

        const band = window.confirm('Are you sure you want to delete this user?');
        if(band){
          try {
            let response = await fetch(`${pathURL}/user/delete/${btnDelete.value}`,{
              method: "DELETE",
                  headers:{
                    'Content-Type': 'application/json'
                  }              
            })
            .catch(console.error(e))            
            .then(e=>{
              alert('User successfully deleted');
              window.location.reload();
            });
          } catch (error) {
            console.error(error);
          }          
        }        
      });
    });    
  }

  /**
   * desciprtion: Edit User
   */
  if(urlSplit.indexOf('users') !== -1 && urlSplit.indexOf('edit') !== -1){
    
    const addUserForm = document.querySelector('#edit-user-form');    
    addUserForm.addEventListener('submit', async function(e){
      
      e.preventDefault();
      
      const iUserName = document.getElementById('edit-user-name').value;
      const iUserEmail = document.getElementById('edit-user-email').value;
      const iUserCountryCode = document.getElementById('edit-user-countrycode').value;            

      let data = {        
        name:iUserName,
        email:iUserEmail,
        countrycode:iUserCountryCode,        
        status:1
      }

      const band = window.confirm('Are you sure you want to edit this user?');
      if(band){
        try {  
          let response = await fetch(`${pathURL}/user/update/${urlSplit[3]}`,{
            method: "PUT",
                headers:{
                  'Content-Type': 'application/json'
                },
                body:JSON.stringify(data)
          })
          .catch(console.error(e))
          .then(e=>{
            alert("User successfully Edit");
            window.location.reload();
          })              
        } catch (error) {
          alert("An error occurred. Try again later.");
          console.error(error)
        }
      }
    });
  }

  /**
   * desciprtion: Add/Delete Country
   */
  if(urlSplit.indexOf('users') !== -1 && urlSplit.indexOf('add') !== -1){
    
    const addCountryForm = document.querySelector('#add-country-form');    
    const optionSelected = document.querySelector('#country-code-select');
    const countryTitle = document.querySelector('#country-title');
    const countryDelete = document.querySelector('#country-code-select-delete');
    let iCountryAdd = document.getElementById('country-code-add');
    let iCountryDisable = document.getElementById('country-name-add');

    optionSelected.addEventListener('change',async function(){
      iCountryAdd.classList.toggle('d-none');
      countryDelete.classList.toggle('d-none');
      iCountryDisable.classList.toggle('d-none');
      iCountryDisable.disabled = !iCountryDisable.disabled;

      switch (optionSelected.value) {
        case 'delete':
          countryTitle.innerHTML = 'Delete a Country';
  
        break;
        default:
            countryTitle.innerHTML = 'Add New Country';
        break;
  
        }
    });
    
    addCountryForm.addEventListener('submit', async function(e){
      
    e.preventDefault();
  
    let iCountryName = document.getElementById('country-name-add').value;
    let iCountryCode = document.getElementById('country-code-add').value;
    
    
    iCountryName = iCountryName.charAt(0).toUpperCase() + iCountryName.slice(1);
    iCountryCode = iCountryCode.toUpperCase();      
    
      switch (optionSelected.value){
        case 'delete':         
          console.log(countryDelete.value);
          try {
           let response = await fetch(`${pathURL}/country/delete/${countryDelete.value}`,{
             method: "DELETE",
                 headers:{
                   'Content-Type': 'application/json'
                 },
           })
           .catch(console.error(e))
           .then(e=>{
             alert("Country successfully delete");
             addCountryForm.reset();
             window.location.reload();
           });        
           } catch (error) {
             alert("An error occurred. Try again later.");
             console.error(error)
           }
  
        break;
        default:
          iCountryCode.disable = false;
            data = {        
              code:iCountryCode,
              name:iCountryName,
            }
               try {
                let response = await fetch(`${pathURL}/country/add`,{
                  method: "POST",
                      headers:{
                        'Content-Type': 'application/json'
                      },
                      body:JSON.stringify(data)
                })
                .catch(console.error(e))
                .then(e=>{
                  alert("Country successfully Add");
                  addCountryForm.reset();
                  window.location.reload();
                });        
              } catch (error) {
                alert("An error occurred. Try again later.");
                console.error(error)
              }
        break;
      }
    });
  }

  /**
   * describe: Tracks Pagination
   */
  if(urlSplit.indexOf('tracks') !== -1 && urlSplit.length === 3){
    const currentPage = parseInt(urlSplit[2]);
    const activePage = document.getElementById(`page-item-${currentPage}`);
    activePage.classList.add('active');
  }

  /**
   * describe: Album Filters classes
   */
  if(urlSplit.indexOf('albums') !== -1 && urlSplit.length === 2){    

    const btnSearch = document.getElementById('btn-search-album');
    const tabs = document.querySelectorAll('.album-nav-item');
    const albumSearch = document.getElementById('album-search');
    const arrHref = []
  
    
    tabs.forEach(tab=>{
      tab.addEventListener('click',function(e){        
        e.preventDefault();        
        if(this.id === 'album-all'){
          albumSearch.classList.add('d-none');  
          return window.location.href = "/albums";
        }

        tabs.forEach(tab=>tab.classList.remove('active'));
        /*if(window.location.search){
        }*/
        this.classList.add('active');
        
        albumSearch.classList.remove('d-none');          


        arrHref[0] = tab.href;
      });
    });

    btnSearch.addEventListener('click',async function(e){
      e.preventDefault();
      const search = document.getElementById('search-album').value;      
       window.location.href = `${arrHref[0]}-${search}`
    })    
  }
});

