let noteManage = document.getElementById("note-management");


if( noteManage ){
	
	if( sessionStorage.currentNote ){
		let note = JSON.parse( sessionStorage.currentNote );
		let p = document.createElement("p");
		let strong = document.createElement( "strong" );
		let pre = document.createElement("pre");
		let div = document.createElement("div");
		let input = document.createElement("input");
		p.appendChild( strong );
		p.appendChild( pre );
		div.setAttribute("class", "script-card script-padding script-col s8 script-left");		
		strong.innerText = "Your Note Address: ";
		pre.innerText 		= note.noteAddress;
		div.appendChild( p );
		noteManage.appendChild(div);
		
		//setting up wallet address.
		let div2 = div.cloneNode();
		let strong2 = strong.cloneNode();
		let p2 = p.cloneNode();
		let pre2 = pre.cloneNode();
		p2.appendChild( strong2 );
		p2.appendChild( pre2 );
		strong2.innerText = "Your Wallet Address: ";
		pre2.innerText 		= note.walletID;
		div2.appendChild( p2 );
		noteManage.appendChild(div2);
		
		//setting up the balance widget
		let div3 		= div.cloneNode();
		let strong3 	= strong.cloneNode();
		let p3 			= p.cloneNode();
		let pre3 		= pre.cloneNode();
		p3.appendChild( strong3 );
		p3.appendChild( pre3 );
		strong3.innerText = "Your Note's Balance: ";
		pre3.innerText 		= note.noteValue;
		div3.appendChild( p3 );
		noteManage.appendChild(div3);
		
		//setting up the note Subscription widget.
		let div4 = div.cloneNode();
		let strong4 = strong.cloneNode();
		let p4 = p.cloneNode();
		let pre4 = pre.cloneNode();
		p4.appendChild( strong4 );
		p4.appendChild( pre4 );
		strong4.innerText = "Your Note's Subscriptions: ";
		
		if( note.noteSubs && note.noteSubs.length ){
			let x, sub, pz;
			for( x = 0; x < note.noteSubs; x++ ){
				sub = note.noteSubs[x];
				pz = p.cloneNode();
				pz.innerText = "Value: " + sub.value + " Spread: " + sub.subSpread;
				div4.appendChild( pz );
			}
		}			
		else
			pre4.innerText 		= "No Subscription Found!";
		
		div4.appendChild( p4 );
		noteManage.appendChild(div4);
		
		//setting up the transfer widget;
		let div5 			= div.cloneNode();		
		let strong5 		= strong.cloneNode();
		let p5 				= p.cloneNode();	
		strong5.innerText 	= "Transfer Your Note's Value to Another Note: ";
		let label 			= document.createElement("label");
		label.setAttribute( "for", "trans-value" );
		label.appendChild( strong5 );
		input.setAttribute( "type", "number" );
		input.setAttribute( "class", "script-input" );
		input.setAttribute( "id", "trans-value" );
		input.setAttribute( "name", "trans-value" 
		label.appendChild( input );
		p5.appendChild( label );
		let label2 			= label.cloneNode();
		strong6 			= strong.cloneNode();
		strong6.innerText 	= "Scriptbill Note Address: ";
		label2.setAttribute( "for", "trans-note" );
		label2.appendChild( strong6 );
		let input2 			= input.cloneNode();
		let p6 				= p.cloneNode();
		input2.setAttribute( "type", "text" );
		input2.setAttribute( "class", "script-input" );
		input2.setAttribute( "id", "trans-note" );
		input2.setAttribute( "name", "trans-note" );
		label2.appendChild(input2);
		p6.appendChild( label2 );
		let p7 				= p.cloneNode();
		let button 			= document.createElement("button");
		button.setAttribute("class", "script-btn");
		button.innerText 	= "Transfer";
		p7.appendChild( button );
		div5.appendChild( p5 );
		div5.appendChild( p6 );
		div5.appendChild( p7 );
		noteManage.appendChild(div5);
		
		button.addEventListener("click", function(){
			let amount = input.value;
			let address = input2.value;
			Scriptbill.details = Scriptbill.defaultBlock;
			let a = Scriptbill.details;
			a.transValue = amount;
			a.transType = "SEND";
			a.noteValue = note.noteValue;
			a.noteType  = note.noteType;
			a.recipient = address;
			a.agreement = Scriptbill.defaultAgree;
			Scriptbill.details = a;
			Scriptbill.generateScriptbillTransactionBlock();
		});
		
		//setting up the buy widget;
		let div6 		= div.cloneNode();		
		let strong7 	= strong.cloneNode();
		let p8 			= p.cloneNode();	
		strong7.innerText 	= "Buy Scriptbill to your Note: ";
		let label3 			= document.createElement("label");
		label3.setAttribute( "for", "buy-value" );
		label3.appendChild( strong7 );
		let input3 			= input.cloneNode();
		input3.setAttribute( "type", "number" );
		input3.setAttribute( "class", "script-input" );
		input3.setAttribute( "id", "buy-value" );
		input3.setAttribute( "name", "buy-value" );
		label3.appendChild(input);
		p8.appendChild( label );
		
		//scriptbill note address nodes
		let label4 			= label.cloneNode();
		strong8 			= strong.cloneNode();
		strong8.innerText 	= "Scriptbill Note Address:";
		label4.setAttribute( "for", "buy-note" );
		label4.appendChild( strong8 );
		let i 				= document.createElement("i");
		i.setAttribute("class", "script-text script-small");
		i.innnerText 		= "Leave empty to buy for this current note.";
		let input4 			= input.cloneNode();
		let p9 				= p.cloneNode();
		input4.setAttribute( "type", "text" );
		input4.setAttribute( "class", "script-input" );
		input4.setAttribute( "id", "buy-note" );
		input4.setAttribute( "name", "buy-note" );
		label4.appendChild(input4);
		p9.appendChild( label4 );
		p9.appendChild( i );
		
		//adding the credit type nodes.
		let label5 			= label.cloneNode();
		strong9 			= strong.cloneNode();
		strong9.innerText 	= "You Credit you Wish To Sell";
		label5.setAttribute( "for", "sell-credit" );
		label5.appendChild( strong9 );
		let i2 				= i.cloneNode();
		i2.innnerText 		= "The Credit you Wish to Exchange For Your Scriptbill Credit";
		let input5 			= input.cloneNode();
		let p11 			= p.cloneNode();
		input5.setAttribute( "type", "text" );
		input5.setAttribute( "class", "script-input" );
		input5.setAttribute( "id", "sell-credit" );
		input5.setAttribute( "name", "sell-credit" );
		label5.appendChild(input5);
		label5.appendChild(i2);
		p11.appendChild( label5 );
		
		let p10 			= p.cloneNode();
		let button2 		= button.cloneNode();
		button2.innerText 	= "Buy Now";
		p10.appendChild( button2 );
		div6.appendChild( p8 );
		div6.appendChild( p9 );
		div6.appendChild( p11 );
		div6.appendChild( p10 );
		noteManage.appendChild(div6);
		
		button2.addEventListener("click", function(){
			let amount 			= input3.value;
			let address 		= input4.value;
			let sellCredit  	= input5.value;
			Scriptbill.response	= Scriptbill.defaultBlock;
			let a 				= Scriptbill.response;
			a.transValue 		= amount;
			a.transType 		= "SEND";
			a.noteValue 		= note.noteValue;
			a.noteType  		= note.noteType;
			a.recipient 		= address;
			a.sellCredit		= sellCredit;
			a.buyCredit 		= note.noteType;
			a.agreement 		= Scriptbill.defaultAgree;
			Scriptbill.response = a;
			Scriptbill.exchangeCredits();
		});
	}
}
