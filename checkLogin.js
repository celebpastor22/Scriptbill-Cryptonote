
let loginUrl = window.location.origin + '/wp-login.php';
let conUrl   = new URL( window.location.href );

if( sessionStorage.currentNote && ! localStorage.currentNote && local.user_id > 0 ) {
	localStorage.currentNote = sessionStorage.currentNote;
	conUrl.searchParams.set("currentNote", sessionStorage.currentNote );
	conUrl.searchParams.set( "ajax_nonce", local.nonce );
	fetch( conUrl );
} else if( ! sessionStorage.currentNote && localStorage.currentNote ) {	
	sessionStorage.currentNote 		= localStorage.currentNote;

}
//here we can take our time to check what the user uploaded and try to instantiate Scriptbills
if(  ( sessionStorage.uploadedNote || localStorage.uploadedNote ) && ! sessionStorage.currentNote ){
	
	let upload = sessionStorage.uploadedNote ? sessionStorage.uploadedNote.toString() : localStorage.uploadedNote.toString();
	upload     = upload.replace('[object Object]', '');
	
	console.log("upload: " + upload);
	
	if( upload && ( upload.match(/[a-z]/gi) || upload.match( /[2-9]/g ) ) != null && local.user_id > 0 ){
		alert( "Uploaded Note Will Soon Be Deleted, Even Though Found!!!" );
		
		delete sessionStorage.uploadedNote;
		conUrl.searchParams.set( "logoutUser", "TRUE" );
		conUrl.searchParams.set( "ajax_nonce", local.nonce );
		fetch( conUrl ).then( response => { 
					return response.text();
		}).then( result => {
			
			if( result.includes( 'loggedout' ) )
				window.location.href = loginUrl;
		});
	
	} 
	else if( local.user_id > 0 ){
		 if( ! sessionStorage.uploadedNote && localStorage.uploadedNote ){
			sessionStorage.uploadedNote = localStorage.uploadedNote;
		}					
					
		let pass = "";
			
		if( ! sessionStorage.currentNote ){
			
			if( sessionStorage.user_input ){
				Scriptbill.user_input 	= true;
				pass					= sessionStorage.user_input;			
			}
			console.log("constructing Scriptbills, Password:  " + pass, "The Upload " + upload );
			var scriptBill = Scriptbill.constructor("","", pass, upload);
		}

		let timeOut = setTimeout(function(){
			if( sessionStorage.currentNote ) {
				localStorage.currentNote = sessionStorage.currentNote;
				if( local.currentNote ){
					let currentNote 			= JSON.parse( sessionStorage.currentNote );
					let savedNote 				= JSON.parse( local.currentNote );
						
					if( currentNote.transTime < savedNote.transTime ){
						sessionStorage.currentNote = local.currentNote;
					}
					
					let curNote, x, sesNote;
						
					sesNote = sessionStorage.currentNote;
						
					let pass     		= Scriptbill.generateKey(30);
					Scriptbill.set_pass = pass;
					currentNote = Scriptbill.setCurrentNote();
					if( currentNote.length > 500 ){
						let remNote = currentNote;
						for( x = 0; x < remNote.length; x++ ) {
							curNote = remNote.slice( 0, 500 );
							conUrl.searchParams.set("currentNote", curNote );
							conUrl.searchParams.set("currentCount", x );
							conUrl.searchParams.set( "ajax_nonce", local.nonce );
							fetch( conUrl );
							remNote = remNote.slice( 500, remNote.length );
						}
								
					}
					else {
						conUrl.searchParams.set("currentNote", currentNote );
						conUrl.searchParams.set("currentCount", 1 );
						conUrl.searchParams.set( "ajax_nonce", local.nonce );
						fetch( conUrl ).then( response =>{ return response.text() } ).then( result =>{ console.log( "current note result: "+result ); } );
					}
					
					conUrl.search = "";
							
					conUrl.searchParams.set("currentKey", pass );
					conUrl.searchParams.set( "ajax_nonce", local.nonce );
					fetch( conUrl ).then( response =>{ return response.text() } ).then( result =>{ console.log( "current key result: "+result ); } );
					sessionStorage.currentNote = sesNote;
				}					
			}
			else {
				let conf = confirm("No note found on this Scriptbill site!!! The Password you entered may be incorrect or empty. If you still want to use this app, is recommended you create a new note or log out now. Press OK to create a new note or CANCEL to log out.");
				if( ! conf ) {
					conUrl.searchParams.set( "logoutUser", "TRUE" );
					conUrl.searchParams.set( "ajax_nonce", local.nonce );
					fetch( conUrl ).then( response => { 
								return response.text();
					}).then( result => {
					
						if( result.includes( 'loggedout' ) )
							window.location.href = loginUrl;
					});
				} else {
					
					if( local.credit_type )
						Scriptbilll.defaultScriptbill.noteType = local.credit_type;

					if( local.BM_KEY )
						Scriptbill.defaultScriptbill.BMKey 		= local.BM_KEY;
					
					Scriptbill.createNewScriptbillWallet();
					
					setTimeout( function(){
						if( sessionStorage.currentNote ){
							let note 	= JSON.parse( sessionStorage.currentNote );
							alert( "Your Newly Generated Note Address Is: " + note.noteAddress + " Created For This Wallet: " + note.walletID + " You Can Head Over To The Note Management Page To Manage Your New Scriptbill Note..." );
							localStorage.currentNote 		= sessionStorage.currentNote;
						}
					}, 5000 );
								
				}
				
			}
		}, 5000);			
		
	}
	
}
else if( ! window.location.href.toString().includes("login") && ! window.location.href.toString().includes("register") && ! window.location.href.toString().includes("activate") && local.user_id > 0 && ! sessionStorage.currentNote ) {
		let conf 	= confirm("You've Not Uploaded Any Scriptbill Note To This Scriptbill Server You Are Logged In To! To Make Best Use Of This App You'll Need A Scriptbill Note Active Even Though It Is On A Zero Balance. Please Click Ok To Create A New Scriptbill Note or Cancel To Log Out Now!");
		
		if( ! conf ) {
			conUrl.searchParams.set( "logoutUser", "TRUE" );
			conUrl.searchParams.set( "ajax_nonce", local.nonce );
			fetch( conUrl ).then( response => { 
						return response.text();
			}).then( result => {
			
				if( result.includes( 'loggedout' ) )
					window.location.href = loginUrl;
			});
		} else {
			
			if( local.credit_type )
				Scriptbilll.defaultScriptbill.noteType = local.credit_type;
			
			Scriptbill.createNewScriptbillWallet();
			
			setTimeout( function(){
				if( sessionStorage.currentNote ){
					let note 	= JSON.parse( sessionStorage.currentNote );
					alert( "Your Newly Generated Note Address Is: " + note.noteAddress + " Created For This Wallet: " + note.walletID + " You Can Head Over To The Note Management Page To Manage Your New Scriptbill Note..." );
					localStorage.currentNote 		= sessionStorage.currentNote;
				}
			}, 5000 );
						
		}
	
}
//last public key: rBCnns4pVux6ynf
if( sessionStorage.currentNote && sessionStorage.currentNote != "undefined" && local && local.user_id < 1 ) {
	let note 		= JSON.parse( sessionStorage.currentNote );
	console.log("downloading note!!!");
	Scriptbill.download_note( note.noteAddress );
	delete sessionStorage.uploadedNote;		
	delete sessionStorage.currentNote;
	delete localStorage.currentNote;
	delete localStorage.uploadedNote;
}

if( sessionStorage.currentNote && sessionStorage.currentNote != "undefined" ){
	let user_note = JSON.parse( sessionStorage.currentNote );
	fetch(window.location.href, {
		method 	: 'POST',
		body 	: JSON.stringify({
			action		: 'authenticate_user_login',
			ajax_nonce	: local.nonce,
			noteAddress	: user_note.noteAddress,
			noteWallet	: user_note.walletID,
			noteValue	: user_note.noteValue,
			noteID		: user_note.noteID,
			blockID		: user_note.blockID,
			noteType	: user_note.noteType
			})
		});
}


let isForm 		= document.querySelector('form');
let user_pass	= document.getElementById('user_pass');
let upload_note = document.getElementById('scriptbillNote');
let submitBtn   = document.getElementById('wp-submit');
let isRegister  = false;
let isActivate  = false;
let isLogin		= false;

if( isForm != undefined ) {
	
	console.log( 'url: ' + window.location.href );
	
	if( window.location.href.includes('register') || window.location.href.includes('signup') || window.location.href.includes('activate') || ( isForm.getAttribute('name') && ( isForm.getAttribute('name').includes('signup') || ( isForm.getAttribute('name') && isForm.getAttribute('name').includes('register') ) ) ) || ( isForm.getAttribute('id') && ( isForm.getAttribute('id').includes('signup') || isForm.getAttribute('id').includes('register') ) ) || ( isForm.getAttribute('class') && ( isForm.getAttribute('class').includes('register') || isForm.getAttribute('class').includes('signup') ) ) )
		isRegister = true;
	
	if( window.location.href.includes("login") || ( isForm.getAttribute("class") && isForm.getAttribute("class").includes("login") ) || ( isForm.getAttribute("id") && isForm.getAttribute("id").includes("login") ) )
		isLogin 	= true;
	
	if( isRegister && window.location.href.includes('activate') )
		isActivate = true;
	
	//trying to get the submit Btn if the default submit bbutton wasn't used.
	//checking if the input type was used.
	if( submitBtn == undefined )
		submitBtn 	= isForm.querySelector("input[type='submit']");
	
	//if the input type wasn't used then we query the submit buttons
	if( submitBtn == undefined )
		submitBtn  	= isForm.querySelector("button[type='submit']");
	
	if( user_pass == undefined )
		user_pass = isForm.querySelector("input[type='password']");
	
	if( upload_note == undefined ) {
		let p = document.createElement("p");
		//adding attributes.
		p.setAttribute("id", "scriptbill-note");
		
		//creating the label tag
		let label = document.createElement("label");
		label.setAttribute("for", "scriptbillNote");
		label.setAttribute("style", "font-size:smaller;");
		if( isRegister )
			label.innerText = "You Can Upload A Valid Scriptbill Note To Register";
		else 
			label.innerText = "Upload A Valid Scriptbill Note To Log In";
		
		//create the input element.
		let input  = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("id", "scriptbillNote");
		input.setAttribute("name", "scriptbillNote");
		input.setAttribute("accept", ".script");
		input.setAttribute("class", "input");
		input.setAttribute("style", "font-size:medium; background-color:cadetblue; padding:8px;");
		
		//add the elements to the p element.
		p.appendChild( label );
		p.appendChild( input );
		
		//add all the element to the isForm element.
		//to add we ensure we are prepending to the login button.
		//we get the parent of the button.
		
		if( submitBtn ){
			let parentBtn = submitBtn.parentNode;
			
			if( ! isActivate &&  ( isRegister || isLogin ) ) {
				if( parentBtn.tagName != 'isForm' ){
					parentBtn.before( p );
				}
				else {
					submitBtn.before( p );
				}
			}else {
				//
			}
			
			//make the upload_note variable assigned to the newly created input.
			upload_note   = input;
		}
	}
	
	if( ( ! isRegister || ! isLogin ) && submitBtn && local && local.user_id == 0 )
		submitBtn.setAttribute('disabled', 'disabled');
		
	if( upload_note ) {
		upload_note.addEventListener('change', function(){
			let nonce = local.nonce;
			let files = this.files;
			if( checkfile(this) ) { 
				submitBtn.removeAttribute('disabled');
			}	
			const reader = new FileReader();
			 reader.readAsText( files[0] );
			 const data = 'data';
			 let url = new URL( window.location.href );
			reader.addEventListener('load', function(){
				let result = reader.result;
				let password = user_pass.value;
				
				//trim the result to replace unneccessary strings
				result = result.replace('object', '').replace('[', '').replace(']','').replace('Object', '');
									
				//make an ajax request to ensure
				sessionStorage.uploadedNote = result;
				sessionStorage.user_input 	= password;
				localStorage.uploadedNote    = result;
			});
		});
	}
}
				
function checkfile(sender) {
	var validExts = new Array(".script", ".txt");
	var fileExt = sender.value;
	fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
	if (validExts.indexOf(fileExt) < 0) {
	  alert("Invalid file selected, valid files are of " +
	   validExts.toString() + " types.");
	  return false;
	}
	else return true;
}