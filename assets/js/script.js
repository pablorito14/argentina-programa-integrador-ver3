let menu_open = false 
const openMenu = () => {

  if(menu_open === false){
    document.getElementById('menu').style.display = 'grid';
    
  } else {
    document.getElementById('menu').style.display = 'none'
  }

  menu_open = !menu_open;
}

