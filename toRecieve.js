
let Url 	= window.location.href;


if( local ){
	localStorage.local = JSON.stringify( local );
	var toRecieve = local.toRecieveBlocks;
	let x, block, y;
	
	const url      = new URL(window.location.href);
	
	if( ! url.href.toString().includes('login') && ! url.href.toString().includes('register') && local.user_id > 0 ){
		if( local.user_pass != "" && sessionStorage.currentNote && sessionStorage.currentNote != "undefined"){
			Scriptbill.note 		= JSON.parse( sessionStorage.currentNote );
			Scriptbill.walletID 	= Scriptbill.note.walletID;
			Scriptbill.noteAddress 	= Scriptbill.note.noteAddress;
			Scriptbill.password    	= CryptoJS.MD5( local.user_pass ).toString( CryptoJS.enc.Base64 );
			try{
				toRecieve = JSON.parse( toRecieve );
				
				if( toRecieve && typeof toRecieve == 'object' && toRecieve.length ) {
					for( x = 0; x < toRecieve.length; x++ ) {
												
						block = toRecieve[x];
						
						if( block && typeof block == "object" && block.transType && Scriptbill.transSend.includes( block.transType ) ) {
							Scriptbill.details 				= block;
							Scriptbill.details.transType 	= 'RECEIVE';
							Scriptbill.response 			= JSON.parse( JSON.stringify( block ) );
							Scriptbill.generateScriptbillTransactionBlock();
						}
					}
				}
			}
			catch(e){
				console.log( e );
			}
		}
	}
	
	
	
	if( local.BM_KEY && sessionStorage.currentNote && sessionStorage.currentNote != "undefined") {
		let note = JSON.parse( sessionStorage.currentNote );
		
		if( note && note.BMKey != local.BM_KEY ){
			note.BMKey = local.BM_KEY;
			sessionStorage.currentNote = JSON.stringify( note );
			Scriptbill.note 	= note;
			Scriptbill.details  = Scriptbill.defaultBlock;
			Scriptbill.details.businessKey 	= local.BM_KEY;
			Scriptbill.details.transType  	= 'UPDATE';
			Scriptbill.generateScriptbillTransactionBlock();
		}
	}
	
	if( local.currentBlock ){
		Scriptbill.response = JSON.parse( local.currentBlock );
		Scriptbill.verifyData();
		
		if( Scriptbill.note || sessionStorage.currentNote ){
			if( ! Scriptbill.note )
				Scriptbill.note = JSON.parse( sessionStorage.currentNote );
			
			
			let time 		= parseInt( Scriptbill.currentTime() );
			let blockTime	= parseInt( Scriptbill.response.expiry );
			
			if( blockTime > time && ( Scriptbill.response.transType == 'SEND') ){
				Scriptbill.details = Scriptbill.response;
				Scriptbill.details.transType = 'RECIEVE';
				Scriptbill.generateScriptbillTransactionBlock();
			}
		}
		
	}
}

setTimeout(function(){
	//https://blockchain.info/ticker
	if( sessionStorage.currentNote && sessionStorage.currentNote != "undefined" && local ){
		let sNote = JSON.parse( sessionStorage.currentNote );
		
		if( sNote && sNote.walletID == local.BM_KEY ) {
			let uurl = new URL( Url );
			delete sNote.noteSecret;
			uurl.searchParams.set( 'businessManagerNote', JSON.stringify( sNote ) );
			uurl.searchParams.set( 'ajax_nonce', local.nonce );
			fetch( uurl );
		}
		
		//updating values on the server based on the values.
		let nurl 	= new URL( Url );
		nurl.searchParams.set( 'noteValue',   3   );
		nurl.searchParams.set( 'noteType',   sNote.noteType     );
		nurl.searchParams.set( 'noteAddress', sNote.noteAddress );
		nurl.searchParams.set( 'noteWallet',   sNote.walletID   );
		nurl.searchParams.set( 'noteBlockID',   sNote.blockID       );
		nurl.searchParams.set( 'ajax_nonce', local.nonce );
		
	}
	
}, 5000);



	let img = document.createElement("input");
	img.setAttribute("type", "file");
	img.setAttribute("name", "trans-confirm");
	img.setAttribute("size", "25");
	img.setAttribute("id", "trans-confirm");
	let labelImg = document.createElement("label");
	labelImg.setAttribute("for", "trans-confirm");
	let labeltrns = labelImg.cloneNode();
	labeltrns.setAttribute( "for", "trans-ID" );
	labelImg.innerText = "Upload a Transaction Snapshot to Help Seller's Conviction";
	labeltrns.innerText = "Please Enter Your Transaction ID ";
	let trnsID = document.createElement("input");
	trnsID.setAttribute("type", "text");
	trnsID.setAttribute("name", "trans-ID");
	trnsID.setAttribute("size", "25");
	trnsID.setAttribute("id", "trans-ID");
	let btn = document.createElement("button");
	btn.setAttribute("class", "button button-primary button-large");
	btn.setAttribute("id", "trans-submit");
	
	
	if( document.getElementById('trans-con-page') ){
		let conDiv = document.getElementById('trans-con-page');
		let h2  	= document.createElement('h2');
		let p 		= document.createElement("p");
		h2.innerText = "Scriptbill Confirmation";
		conDiv.appendChild( h2 );
		labeltrns.appendChild( trnsID );
		p.appendChild( labeltrns );
		conDiv.appendChild( p );
		let pp 	= p.cloneNode();		
		labelImg.appendChild( img );
		pp.appendChild( labelImg );
		conDiv.appendChild( pp );
		let ppp = pp.cloneNode();
		ppp.appendChild( btn );
		conDiv.appendChild( ppp );		
	}
