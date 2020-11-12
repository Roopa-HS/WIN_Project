function donateblood(){

    var selectedBloodGroup=document.getElementById('blood');
    var optGroup=selectedBloodGroup.options[selectedBloodGroup.selectedIndex];
    document.write("Selected Blood Group is "+selectedBloodGroup.value+optGroup.value+optGroup.text);
    
}