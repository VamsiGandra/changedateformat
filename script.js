console.log('pe');

var fbRef = firebase.database().ref("users");

// step - 1 change format from yyyy-mm-dd to dd-mm-yyyy 

fbRef.once('value').then(function(snapshot) {
    let count = 0;
    snapshot.forEach(element => {
        //console.log(element.val().dob);
        var item = element.val();
        item.key = element.key;
        if(element.val().dob == undefined){

        } else {
            let parts = element.val().dob.split('-');  
            //console.log(parts[2]);
           console.log(parts[0].length);
            if(parts[0].length > 2){
                fbRef.child(element.key).update({ dob : parts[2]+ '-'+ parts[1] + '-'+ parts[0]}).then(val => {
                                console.log('finished', val);
                            })
                            console.log(parts[2]+ '-'+ parts[1] + '-'+ parts[0]);
                count++;
            }
            
        }
        
    });
    console.log(count);
  });

// step - 2 change format from  dd-mm-yyyy to yyyy-mm-dd and also adding 0

//   fbRef.once('value').then(function(snapshot) {
//     let count = 0;
//     snapshot.forEach(element => {
//         console.log(element.val().dob);
//         var item = element.val();
//         item.key = element.key;
//         if(element.val().dob == undefined){

//         } else {
//             let parts = element.val().dob.split('-');  
//         let dd, mm, yy;   

//         if(parts[0].length == 1){
//             dd = '0'+parts[0];
//             console.log('the date is', dd)
//         } else {
//             dd = parts[0];
//         }
//         if(parts[1].length == 1){
//             mm = '0'+parts[1];
//             console.log('the month is', mm)
//         } else {
//             mm = parts[1];
//         }
//          yy = parts[2];
        
//          console.log('the formatted date is', yy+ '-'+ mm + '-'+ dd)
//         fbRef.child(element.key).update({ dob : yy+ '-'+ mm + '-'+ dd}).then(val => {
//             console.log('finished', val);
//         }).catch(err => {
//             console.log('err', err.message);
//         })

//         count = count + 1;

//         }
        
//     });
//     console.log(count);
//   });


// verify if the format is correct

  fbRef.once('value').then(function(snapshot) {
    let count = 0;
    snapshot.forEach(element => {

        if(element.val().dob == undefined){
            console.log('date undefined',element.key);
                    }
        
        if(moment(element.val().dob, 'YYYY-MM-DD', true).isValid()){
            count = count + 1;
            
        } else {
            console.log('date not correct format', element.key);
        }
    });
    console.log(count);
  });






