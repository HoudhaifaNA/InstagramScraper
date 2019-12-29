const input = document.querySelector('.input');

let loaderContainer = document.querySelector('.loader-container');

const clearInp = inputVal => {
  inputVal.value = '';
};


const renderLoader = () => {

  const loader = `
  <div class="loader"></div>
  `;

  loaderContainer.insertAdjacentHTML('afterbegin', loader); 
}

const clearLoader = () => {
  
  loaderContainer.innerHTML = ''; 
}



async function getFollowers() {

  renderLoader(); 

  try {
    let input = document.querySelector('.input').value;
    const { data } = await axios.get(
      `https://www.instagram.com/${input}/?__a=1`
    );


    clearLoader(); 
    let user = data.graphql.user;
    let posts = user.edge_owner_to_timeline_media.count;
    let followers = user.edge_followed_by.count;
    let following = user.edge_follow.count;
    let user_name = user.username;
    let profilePicture = user.profile_pic_url_hd;
    let biography = user.biography;

    followers = followers.toString();

    if (followers.length > 4 && followers.length <= 6) {
      followers = followers.split('');
      followers = followers
        .reverse()
        .splice(3)
        .reverse()
        .join('');
      followers = parseInt(followers, 10);
      followers = followers + 'k';
    } else if (followers.length > 6) {
      followers = followers.split('');
      followers = followers
        .reverse()
        .splice(6)
        .reverse()
        .join('');
      followers = parseInt(followers, 10);
      followers = followers + 'm';
    }
    

    const markup = `
    <div class="container">   
     <div class="image-block">
      <div class="user-image">
      <img src="${profilePicture}" alt="" class="user-photo">
      </div>
     </div>
    <div class="user-information">
     <h1 class="username">${user_name}</h1>
     <div 
     class="counts">
      <span class="posts"><span class="posts-num">${posts}</span> posts</span>
      <span class="followers"><span class="followers-num">${followers}</span>followers</span>
      <span class="followings"><span class="followings-num">${following}</span>followings</span>
     </div>
     <h3 class="bio">${biography}</h3>
    </div>
    </div>
    `;
    
    document.querySelector('.users').insertAdjacentHTML('beforeend', markup);
  } catch (err) { 
    alert(`User doest exist`);
    clearLoader(); 
  }
}

//* Final Function
const getInfo = () => {
  getFollowers();

  clearInp(input);
};


let btn = document.querySelector('.btn');

//* Fire the events listeners

//* Click button
btn.addEventListener('click', getInfo);

//* Delete 
document.querySelector('.delete-btn').addEventListener('click', () => {
  document.querySelector('.users').innerHTML = ''; 
})

//* Click on enter
document.addEventListener('keypress', e => {
  if (e.keyCode === 13) {
    getInfo();
  }
});
