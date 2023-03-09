		//=============================Scriptbill Class Main====================================
	class Scriptbill {

	static noteID;//The id of the note which changes on every transaction made.
	static noteAddress;//the address of the current note the user wants to use.
	static noteType		= 'SBCRD';//the class of the note.
	static l = this.initStorage();//Scriptbill may represent the permanent storage of a particular user. Since Scriptbill torage is limited, few things can be stored on the user'this.s database, so we strink data everyday to ensure spaces are available for use on Scriptbill storage.
	static s = this.initSessionStorage();//Scriptbill storage is used to save things that would not be beyyond the current browaer session of the user, if data expected to be on Scriptbill storage is not found, then the user would be asked to log in again to rebuild the data
	//static test = this.test();
	//used to declare a mother note when creating a new credit for the note or saving any other note that must be present
	//when running an important transaction. For instance when running a transaction in an online store
	//the store can choose to process her transaction immediately, thereby storing note in this variable
	static #currentNote;
	
	static #motherKeys   = {};
	
	static #saveNote     = true;
	//static recieve		 = this.runRecieveData();
	
	/*
	@fiatCurrencies
	Holds an update to all fiate currencies that will be featured on the Scriptbill Network
	whose exchange market is held by Scriptbank.
	*/
	static fiatCurrencies = {
  "42": "42 Coin",
  "300": "300 token",
  "433": "433 Token",
  "611": "SixEleven",
  "808": "808TA",
  "888": "Octocoin",
  "1337": "EliteCoin",
  "2015": "2015 coin",
  "ARC*": "Arcade City",
  "CLUB": "ClubCoin",
  "007": "007 coin",
  "ZCN": "0chain",
  "ZRX": "0x",
  "0xBTC": "0xBitcoin",
  "BIT16": "16BitCoin",
  "MCT": "1717 Masonic Commemorative Token",
  "1CR": "1Credit",
  "1WO": "1World",
  "CHAO": "23 Skidoo",
  "ARMS": "2Acoin",
  "2BACCO": "2BACCO Coin",
  "2GIVE": "2GiveCoin",
  "2TF": "2TF",
  "32BIT": "32Bitcoin",
  "3XD": "3DChain",
  "3DES": "3DES",
  "8BT": "8 Circuit Studios",
  "8BIT": "8BIT Coin",
  "ATKN": "A-Token",
  "AAA": "AAA Reserve Currency",
  "RTB": "AB-CHAIN",
  "ABC": "AB-Chain",
  "AT": "ABCC Token",
  "AC3": "AC3",
  "ACA": "ACA Token",
  "ACT": "ACT",
  "ACOIN": "ACoin",
  "AENT": "AEN",
  "AEON": "AEON",
  "AERGO": "AERGO",
  "AGT": "AGATE",
  "AIC": "AI Crypto",
  "AIDOC": "AI Doctor",
  "AIT": "AIChain Token",
  "XAI*": "AICoin",
  "AIOT": "AIOT Token",
  "AITT": "AITrading",
  "AXT": "AIX",
  "ALX": "ALAX",
  "ALIS": "ALISmedia",
  "ALT": "ALTcoin",
  "AMBT": "AMBT Token",
  "AMIS": "AMIS",
  "AMLT": "AMLT",
  "AMO": "AMO Coin",
  "ANON": "ANON",
  "ANTS": "ANTS Reloaded",
  "APIS": "APIS",
  "APS": "APRES",
  "QEY": "AQwire",
  "ARB*": "ARBITRAGE",
  "ARE": "ARENON",
  "ARK": "ARK",
  "ARNA": "ARNA Panacea",
  "ARR": "ARROUND",
  "ASGC": "ASG",
  "ASQT": "ASQ Protocol",
  "ATB": "ATB coin",
  "ATCC": "ATC Coin",
  "ATFS": "ATFS Project",
  "ATL": "ATLANT",
  "ATM": "ATMChain",
  "AUC*": "AU-Coin",
  "AWAX": "AWAX",
  "AXR": "AXRON",
  "AXS": "AXS",
  "ABELE": "Abele",
  "ABJ": "Abjcoin",
  "ABS": "Absolute Coin",
  "ACC*": "Accelerator Network",
  "ACCO": "Accolade",
  "AEC": "AcesCoin",
  "ACES": "AcesCoin",
  "ACT*": "Achain",
  "ACH": "AchieveCoin",
  "ACID": "AcidCoin",
  "OAK": "Acorn Collective",
  "ACM": "Actinium",
  "ACTN": "Action Coin",
  "AMT": "Acumen",
  "AAC": "Acute Angle Cloud",
  "ACC": "AdCoin",
  "ADX": "AdEx",
  "ADT": "AdToken",
  "ADAB": "Adab Solutions",
  "ADM": "Adamant",
  "ADB": "Adbank",
  "ADL": "Adelphoi",
  "ADH": "Adhive",
  "ADI": "Aditus",
  "ADST": "Adshares",
  "AIB": "AdvancedInternetBlock",
  "ADZ": "Adzcoin",
  "AGS": "Aegis",
  "AEN": "Aenco",
  "AERM": "Aerium",
  "AERO": "Aero Coin",
  "AM": "AeroMe",
  "ARN": "Aeron",
  "XRM": "Aerum",
  "AER": "Aeryus",
  "AE": "Aeternity",
  "ATT": "Aeternum",
  "AET": "AfterEther",
  "AGVC": "AgaveCoin",
  "ESTATE": "AgentMile",
  "AGRS": "Agoras Token",
  "DLT": "Agrello Delta",
  "AHT": "Ahoolee",
  "AIBB": "AiBB",
  "AID": "AidCoin",
  "ADN": "Aiden",
  "ADK": "Aidos Kuneen",
  "AIX": "Aigang",
  "AIM": "Aimedis",
  "AION": "Aion",
  "APOD": "AirPod",
  "AST": "AirSwap",
  "AIR": "AirToken",
  "AIRT": "Aircraft",
  "AKA": "Akroma",
  "ALCE": "Alcedo",
  "ALEX": "Alexandrite",
  "PLM": "Algo.Land",
  "ALG": "Algory",
  "ABBC": "Alibabacoin",
  "ALN": "AlienCoin",
  "SOC": "All Sports Coin",
  "AFO": "AllForOneBusiness",
  "ASAFE2": "Allsafe",
  "APC": "AlpaCoin",
  "ALPS": "Alpenschillling",
  "ALF": "AlphaCoin",
  "AX": "AlphaX",
  "ACAT": "Alphacat",
  "ALP": "Alphacon",
  "APZ": "Alprockz",
  "ALQO": "Alqo",
  "ALTCOM": "AltCommunity Coin",
  "ALTOCAR": "AltoCar",
  "ALUX": "Alux Bank",
  "AS": "AmaStar",
  "AMBER": "AmberCoin",
  "AMB": "Ambrosus",
  "AMC": "AmericanCoin",
  "AMX": "Amero",
  "AMMO": "Ammo Rewards",
  "AMN": "Amon",
  "AMOS": "Amos",
  "VEO": "Amoveo",
  "AMS": "Amsterdam Coin",
  "AMY": "Amygws",
  "ANCP": "Anacrypt",
  "ANAL": "AnalCoin",
  "ACP": "Anarchists Prime",
  "AND": "AndromedaCoin",
  "ANGL": "Angel Token",
  "AVH": "Animation Vision Cash",
  "ANI": "Animecoin",
  "ANK": "Ankorus Token",
  "ANKR": "Ankr Network",
  "ANC": "Anoncoin",
  "RYZ": "Anryze",
  "ANTI": "Anti Bitcoin",
  "ATHK": "AntiHACK.me",
  "ANTC": "AntiLitecoin",
  "CPX": "Apex Token",
  "APEX": "ApexCoin",
  "APH": "Aphelion",
  "APL": "Apollo Currency",
  "APXT": "ApolloX",
  "XAP": "Apollon",
  "APPC": "AppCoins",
  "APT": "Aptcoin",
  "APX": "Apx",
  "AQUA": "Aquachain",
  "ARCO": "AquariusCoin",
  "AR*": "Ar.cash",
  "ARQ": "ArQmA",
  "ALC": "Arab League Coin",
  "ANT": "Aragon",
  "ARAW": "Araw",
  "ARBI": "Arbi",
  "ARB": "Arbit Coin",
  "ARCT": "ArbitrageCT",
  "ABT": "ArcBlock",
  "ARCX": "ArcadierX",
  "ARCH": "ArchCoin",
  "ARC": "ArcticCoin",
  "ARDR": "Ardor",
  "ARENA": "Arena",
  "ARG": "Argentum",
  "AGM": "Argoneum",
  "ARGUS": "ArgusCoin",
  "ARI": "AriCoin",
  "ARO": "Arionum",
  "BOTS": "ArkDAO",
  "ARM": "Armory Coin",
  "ARPA": "ArpaCoin",
  "ABY": "ArtByte",
  "ATP": "ArtPro",
  "ARS": "Artcoin",
  "ARTE": "Artemine",
  "ATX": "ArtexCoin",
  "AUA": "ArubaCoin",
  "ASN": "Ascension Coin",
  "XAS": "Asch",
  "AC": "Asia Coin",
  "ADCN": "Asiadigicoin",
  "ATX*": "Aston",
  "AST*": "Astral",
  "ASTRO": "Astronaut",
  "ATH": "Atheios",
  "THO": "Athero",
  "ATMOS": "Atmos",
  "ATOM": "Atomic Coin",
  "AWC": "Atomic Wallet Coin",
  "ATMI": "Atonomi",
  "ATTR": "Attrace",
  "AUC": "Auctus",
  "ADC": "AudioCoin",
  "REP": "Augur",
  "AUK": "Aukcecoin",
  "AURS": "Aureus",
  "AURA": "Aurora",
  "AOA": "Aurora",
  "AUR": "Aurora Coin",
  "AURUM": "Aurum",
  "AUD": "Aussie Digital",
  "AUN": "Authoreon",
  "ATS": "Authorship",
  "AUPC": "Authpaper",
  "ABX": "AutoBay",
  "ATC": "AutoBlock",
  "NIO*": "Autonio",
  "AUT": "Autoria",
  "ATM*": "Autumncoin",
  "Auxilium": "Auxilium",
  "AVA": "Avalon",
  "AV": "Avatar Coin",
  "AVT": "AventCoin",
  "AOP": "Averopay",
  "AVE": "Avesta",
  "ACN": "AvonCoin",
  "WORK": "Aworker",
  "AXIOM": "Axiom Coin",
  "AXYS": "Axys",
  "AZART": "Azart",
  "AZ": "Azbit",
  "AZU": "Azultec",
  "B21": "B21",
  "B2B": "B2BX",
  "B3": "B3 Coin",
  "KB3": "B3Coin",
  "BAX": "BABB",
  "BAM": "BAM",
  "BANCA": "BANCA",
  "BKX": "BANKEX",
  "BBN": "BBNCOIN",
  "BCV": "BCV Blue Chip",
  "BEAT": "BEAT Token",
  "BEER": "BEER Coin",
  "BERN": "BERNcash",
  "BEX": "BEX token",
  "BFT": "BF Token",
  "BFEX": "BFEX",
  "BHPC": "BHPCash",
  "BITTO": "BITTO",
  "VEE": "BLOCKv",
  "BMT": "BMChain",
  "BSC*": "BOONSCoin",
  "BST*": "BOOSTO",
  "BOS": "BOScoin",
  "BQC": "BQCoin",
  "BQTX": "BQT",
  "BVO": "BRAVO Pay",
  "BRAT": "BROTHER",
  "BTCL": "BTC Lite",
  "BTCM": "BTCMoon",
  "BTU": "BTU Protocol",
  "BAAS": "BaaSid",
  "BAN": "Babes and Nerds",
  "BKC": "Balkancoin",
  "NANAS": "BananaBits",
  "BNT": "Bancor Network Token",
  "XBANK": "Bancryp",
  "B@": "BankCoin",
  "BNK": "Bankera",
  "BCOIN": "BannerCoin",
  "BBN*": "Banyan Network",
  "BBCC": "BaseballCardCoin",
  "BASHC": "BashCoin",
  "BAT": "Basic Attention Token",
  "BASIS": "Basis",
  "BTA": "Bata",
  "BCX": "BattleCoin",
  "BSTK": "BattleStake",
  "SAND": "BeachCoin",
  "BEAM": "Beam",
  "BEAN": "BeanCash",
  "BRDD": "BeardDollars",
  "XBTS": "Beats",
  "BTZC": "BeatzCoin",
  "BEC": "Beauty Chain",
  "BVC": "BeaverCoin",
  "BXY": "Beaxy",
  "BEE": "Bee Token",
  "BFDT": "Befund",
  "BELA": "Bela",
  "BBI": "BelugaPay",
  "BMK": "Benchmark",
  "BNC": "Benjacoin",
  "BENJI": "BenjiRolls",
  "BEST": "BestChain",
  "KNG": "BetKings",
  "CHART": "BetOnChart",
  "BET": "BetaCoin",
  "BFC": "Betform",
  "BETHER": "Bethereum",
  "KRO": "Betoken",
  "BTRM": "Betrium Token",
  "BETR": "BetterBetting",
  "BTXC": "Bettex coin",
  "BETT": "Bettium",
  "BC": "Beverage.cash",
  "BZNT": "Bezant",
  "BEZ": "Bezop",
  "BGG": "Bgogo Token",
  "BNR": "BiNeuro",
  "BBP": "BiblePay",
  "BIX": "BiboxCoin",
  "BID": "BidCoin",
  "BDP": "Bidipass",
  "DOOH": "Bidooh",
  "BDB": "Big Data Block",
  "BBG": "BigBang",
  "HUGE": "BigCoin",
  "LFC": "BigLifeCoin",
  "BIGUP": "BigUp",
  "BBO": "Bigbom",
  "BHC": "BighanCoin",
  "BIC": "Bikercoins",
  "BLRY": "BillaryCoin",
  "XBL": "Billionaire Token",
  "BNB": "Binance Coin",
  "BRC*": "BinaryCoin",
  "BIOB": "BioBar",
  "BIOC": "BioCrypt",
  "BIO": "Biocoin",
  "BIOS": "BiosCrypto",
  "BTRN": "Biotron",
  "BIPC": "BipCoin",
  "BIS": "Bismuth",
  "BZ": "Bit-Z",
  "BAS": "BitAsean",
  "BTB": "BitBar",
  "BAY": "BitBay",
  "BBK": "BitBlocks",
  "BBT": "BitBoost",
  "BOSS": "BitBoss",
  "BRONZ": "BitBronze",
  "BCD*": "BitCAD",
  "BEN": "BitCOEN",
  "BCNA": "BitCanna",
  "BITCAR": "BitCar",
  "CAT*": "BitClave",
  "COAL": "BitCoal",
  "BCCOIN": "BitConnect Coin",
  "BCR": "BitCredit",
  "BTCRY": "BitCrystal",
  "BCY": "BitCrystals",
  "BTCR": "BitCurrency",
  "BDG": "BitDegree",
  "CSNO": "BitDice",
  "HNY": "BitFence",
  "BFX": "BitFinex Tokens",
  "FLIP": "BitFlip",
  "FLX*": "BitFlux",
  "BF": "BitForex Token",
  "HIRE*": "BitHIRE",
  "BIH": "BitHostCoin",
  "STU": "BitJob",
  "BTLC": "BitLuckCoin",
  "LUX*": "BitLux",
  "BTM": "BitMark",
  "BMX": "BitMart Coin",
  "BTMX": "BitMax Token",
  "BTMI": "BitMiles",
  "BITM": "BitMoney",
  "BM": "BitMoon",
  "BITOK": "BitOKX",
  "BTQ": "BitQuark",
  "RNTB": "BitRent",
  "BIT": "BitRewards",
  "BSCH": "BitSchool",
  "BITX": "BitScreener",
  "XSEED": "BitSeeds",
  "BSD": "BitSend",
  "BTE*": "BitSerial",
  "BSR": "BitSoar Coin",
  "BTSG": "BitSong",
  "STASH": "BitStash",
  "BSTN": "BitStation",
  "BST": "BitStone",
  "SWIFT": "BitSwift",
  "BXT": "BitTokens",
  "BTT": "BitTorrent",
  "TUBE": "BitTube",
  "VEG": "BitVegan",
  "VOLT": "BitVolt",
  "BTW": "BitWhite",
  "ZNY": "BitZeny",
  "XBOND": "Bitacium",
  "BTCA": "Bitair",
  "BAC": "BitalphaCoin",
  "BB1": "Bitbond",
  "BOSE": "Bitbose",
  "BTMG": "Bitcademy Football",
  "BTD": "Bitcloud",
  "BTDX": "Bitcloud 2.0",
  "BTCN": "BitcoiNote",
  "B2G": "Bitcoiin2Gen",
  "BTC": "Bitcoin",
  "BCA": "Bitcoin Atom",
  "CDY": "Bitcoin Candy",
  "BCH": "Bitcoin Cash",
  "BTCC": "Bitcoin Core",
  "BCD": "Bitcoin Diamond",
  "BTG": "Bitcoin Gold",
  "BITG": "Bitcoin Green",
  "BTCH": "Bitcoin Hush",
  "XBI": "Bitcoin Incognito",
  "BCI": "Bitcoin Interest",
  "BTN": "Bitcoin Nova",
  "BTPL": "Bitcoin Planet",
  "BTCP": "Bitcoin Private",
  "BTCRED": "Bitcoin Red",
  "BCR*": "Bitcoin Royal",
  "BSV": "Bitcoin SV",
  "BTCS": "Bitcoin Scrypt",
  "BT2": "Bitcoin SegWit2X",
  "BTCS*": "Bitcoin Supreme",
  "BTCD": "BitcoinDark",
  "BTCE*": "BitcoinEX",
  "BCF": "BitcoinFast",
  "BIFI": "BitcoinFile",
  "BTF*": "BitcoinFor",
  "BTCGO": "BitcoinGo",
  "XBC": "BitcoinPlus",
  "BWS": "BitcoinWSpectrum",
  "BCX*": "BitcoinX",
  "BTCZ": "BitcoinZ",
  "BTCUS": "Bitcoinus",
  "BM*": "Bitcomo",
  "BTX": "Bitcore",
  "DARX": "Bitdaric",
  "BDL": "Bitdeal",
  "XBX": "BiteX",
  "BT1": "Bitfinex Bitcoin Future",
  "BTR": "Bither",
  "BTH": "Bithereum",
  "KAN": "Bitkan",
  "BTCL*": "BitluckCoin",
  "BIM": "BitminerCoin",
  "BMXT": "Bitmxittz",
  "XPAT": "Bitnation Pangea",
  "BQ": "Bitqy",
  "BRO": "Bitradio",
  "BTL": "Bitrolium",
  "BITSD": "Bits Digit",
  "BINS": "Bitsense",
  "BTS": "Bitshares",
  "BSX": "Bitspace",
  "XBS": "Bitstake",
  "BITS": "BitstarCoin",
  "BITS*": "Bitswift",
  "BWT": "Bittwatt",
  "BTV": "Bitvote",
  "BWT2": "Bitwin 2.0",
  "BITZ": "Bitz Coin",
  "BTZ": "BitzCoin",
  "BTZN": "Bitzon",
  "BXM": "Bixtrim",
  "BZKY": "Bizkey",
  "XBP": "Black Pearl Coin",
  "BLK": "BlackCoin",
  "BS": "BlackShadowCoin",
  "BBOS": "Blackbox Foundation",
  "BHC*": "BlackholeCoin",
  "BMC": "Blackmoon Crypto",
  "BSTAR": "Blackstar",
  "BBTC": "BlakeBitcoin",
  "BLC": "BlakeCoin",
  "BLAS": "BlakeStar",
  "BLAZR": "BlazerCoin",
  "BLKD": "Blinked",
  "BLITZ": "BlitzCoin",
  "XBP*": "BlitzPredict",
  "ARY": "Block Array",
  "BLTG": "Block-Logic",
  "BCAT": "BlockCAT",
  "BCDN": "BlockCDN",
  "LNC": "BlockLancer",
  "BCPT": "BlockMason Credit Protocol",
  "BMH": "BlockMesh",
  "BLOCK": "BlockNet",
  "BLOCKPAY": "BlockPay",
  "BPL": "BlockPool",
  "BCAP": "Blockchain Capital",
  "BCDT": "Blockchain Certified Data Token",
  "BLX": "Blockchain Index",
  "BCT": "Blockchain Terminal",
  "BTF": "Blockchain Traded Fund",
  "BCIO": "Blockchain.io",
  "BDT": "Blockonix",
  "PASS": "Blockpass",
  "BPT": "Blockport",
  "CCC*": "Blockshipping",
  "TIX": "Blocktix",
  "BKT": "Blocktrade token",
  "BLV": "Blockvest",
  "BNTN": "Blocnation",
  "CYS": "BlooCYS",
  "BLT": "Bloom Token",
  "CDT": "Blox",
  "BLU": "BlueCoin",
  "BDR": "BlueDragon",
  "BLZ": "Bluzelle",
  "BNX": "BnrtxCoin",
  "BOB": "Bob'this.s Repair",
  "BOT": "Bodhi",
  "BOE": "Bodhi",
  "BOG": "Bogcoin",
  "BOLD": "Bold",
  "BLN*": "Bolenum",
  "BOLI": "BolivarCoin",
  "BOLTT": "BolttCoin",
  "BOMB": "BombCoin",
  "BONA": "Bonafi",
  "BON*": "BonesCoin",
  "BON": "Bonpay",
  "BBR": "Boolberry",
  "BOST": "BoostCoin",
  "BMG": "Borneo",
  "BOSON": "BosonCoin",
  "BOS*": "Bostoken",
  "BOTC": "BotChain",
  "CAP": "BottleCaps",
  "BTO": "Bottos",
  "BOU": "Boulle",
  "BNTE": "Bountie",
  "XBTY": "Bounty",
  "BNTY": "Bounty0x",
  "BOUTS": "BoutsPro",
  "AHT*": "Bowhead Health",
  "BSC": "BowsCoin",
  "BOXY": "BoxyCoin",
  "IMPCN": "Brain Space",
  "BRAIN": "BrainCoin",
  "BRAZ": "Brazio",
  "BRD": "Bread token",
  "BRX": "Breakout Stake",
  "BRK": "BreakoutCoin",
  "BRIA": "Briacoin",
  "XBB": "BrickBlock",
  "BCO": "BridgeCoin",
  "BRC": "BrightCoin",
  "BRIK": "BrikBit",
  "BRIT": "BritCoin",
  "BRNX": "Bronix",
  "BXC": "BtcEX",
  "BUBO": "Budbo",
  "BUD": "Buddy",
  "BGL": "Buglab",
  "BT": "BuildTeam",
  "BULLS": "BullshitCoin",
  "BWK": "Bulwark",
  "BUN": "BunnyCoin",
  "BURST": "BurstCoin",
  "BUZZ": "BuzzCoin",
  "BYC": "ByteCent",
  "BTE": "ByteCoin",
  "BCN": "ByteCoin",
  "GBYTE": "Byteball",
  "BYTHER": "Bytether",
  "BTM*": "Bytom",
  "XCT": "C-Bits",
  "C25": "C25 Coin",
  "CAIx": "CAIx",
  "CBD": "CBD Crystals",
  "CCC": "CCCoin",
  "CDRX": "CDRX",
  "CDX": "CDX Network",
  "CEDEX": "CEDEX Coin",
  "CEEK": "CEEK Smart VR Token",
  "CETI": "CETUS Coin",
  "CHIPS": "CHIPS",
  "CIC": "CIChain",
  "CINX": "CINDX",
  "CINNI": "CINNICOIN",
  "CLAM": "CLAMS",
  "CO2": "CO2 Token",
  "CMS": "COMSA",
  "CNCT": "CONNECT",
  "CPY": "COPYTRACK",
  "COSS": "COSS",
  "COTI": "COTI",
  "CPC*": "CPChain",
  "MLS": "CPROP",
  "CPROP": "CPROP",
  "CRWD": "CRWD Network",
  "CMZ": "CRYPTOMAGZ",
  "CRS*": "CRYSTALS",
  "CYBR": "CYBR",
  "CAB": "CabbageUnit",
  "CHE": "Cache",
  "CACH": "Cachecoin",
  "CF": "Californium",
  "CALC": "CaliphCoin",
  "CLO": "Callisto Network",
  "CAM": "Camcoin",
  "CMPCO": "CampusCoin",
  "CAN": "CanYaCoin",
  "CND*": "Canada eCoin",
  "CDN": "Canada eCoin",
  "CAND": "Canlead",
  "CCN": "CannaCoin",
  "XCI": "Cannabis Industry Coin",
  "CANN": "CannabisCoin",
  "CNAB": "Cannabium",
  "XCD": "Capdax",
  "CAPP": "Cappasity",
  "CPC": "CapriCoin",
  "CAR": "CarBlock",
  "CTX": "CarTaxi",
  "CV": "CarVertical",
  "CARAT": "Carats Token",
  "CUSD": "Carbon",
  "CARBON": "Carboncoin",
  "ADA": "Cardano",
  "CARD": "Cardstack",
  "CARE*": "Care Token",
  "CARE": "Carebit",
  "CRGO": "CargoCoin",
  "TICS": "CargoConX",
  "CXO": "CargoX",
  "DIEM": "CarpeDiemCoin",
  "CTC": "CarterCoin",
  "CNBC": "Cash & Back Coin",
  "CASH*": "Cash Poker Pro",
  "CBC*": "CashBagCoin",
  "CBC": "CashBet Coin",
  "CASH": "CashCoin",
  "CSH": "CashOut",
  "CAS": "Cashaa",
  "CSC": "CasinoCoin",
  "CST": "Casper API",
  "CSP": "Caspian",
  "CSTL": "Castle",
  "CAT": "Catcoin",
  "CATT": "Catex",
  "CVTC": "CavatCoin",
  "CAV": "Caviar",
  "CCO": "Ccore",
  "CEL": "Celsius Network",
  "CTR": "Centra",
  "CENNZ": "Centrality Token",
  "CNT": "Centurion",
  "CBS": "Cerberus",
  "XCE": "Cerium",
  "CHC": "ChainCoin",
  "LINK": "ChainLink",
  "ZILLA": "ChainZilla",
  "CHX": "Chainium",
  "CHAN": "ChanCoin",
  "CAG": "Change",
  "CHA": "Charity Coin",
  "CHARM": "Charm Coin",
  "CXC": "CheckCoin",
  "CHK": "Chek",
  "CHESS": "ChessCoin",
  "CHILD": "ChildCoin",
  "CNC": "ChinaCoin",
  "CHIP": "Chip",
  "CHOOF": "ChoofCoin",
  "DAY": "Chronologic",
  "CRX": "ChronosCoin",
  "CHW": "Chrysalis Coin",
  "CLPX": "Chynge.net",
  "CIN": "CinderCoin",
  "CND": "Cindicator",
  "CIR": "CircuitCoin",
  "COVAL": "Circuits of Value",
  "CTL": "Citadel",
  "CTW": "Citowise",
  "CVC": "Civic",
  "CLRTY": "Clarity",
  "CAID": "ClearAid",
  "XCLR": "ClearCoin",
  "POLL": "ClearPoll",
  "CLV": "CleverCoin",
  "CHASH": "CleverHash",
  "CLICK": "Clickcoin",
  "CLIN": "Clinicoin",
  "CLINT": "Clinton",
  "CCCX": "Clipper Coin Capital",
  "CLOAK": "CloakCoin",
  "CKC": "Clockcoin",
  "CLD": "Cloud",
  "CLOUT": "Clout",
  "CLDX": "Cloverdex",
  "CLUD": "CludCoin",
  "COE": "CoEval",
  "COT": "CoTrader",
  "COVEX": "CoVEX",
  "COB": "Cobinhood",
  "COX": "CobraCoin",
  "CTT": "CodeTract",
  "CFC": "CoffeeCoin",
  "CFI": "Cofound.it",
  "COGEN": "Cogenero",
  "COGS": "Cogmento",
  "COG": "Cognitio",
  "COIN*": "Coin",
  "COY": "Coin Analyst",
  "XMG": "Coin Magi",
  "BTTF": "Coin to the Future",
  "C2": "Coin.2",
  "CONI": "CoinBene",
  "CET": "CoinEx token",
  "COFI": "CoinFi",
  "IMP": "CoinIMP",
  "XCJ": "CoinJob",
  "CL": "CoinLancer",
  "LION": "CoinLion",
  "MEE": "CoinMeet",
  "MEET": "CoinMeet",
  "XCM": "CoinMetro",
  "CPL": "CoinPlace Token",
  "CHP": "CoinPoker Token",
  "CPEX": "CoinPulseToken",
  "CCH": "Coinchase",
  "DAILY": "Coindaily",
  "CGT": "Coingrid",
  "CTIC": "Coinmatic",
  "COI": "Coinnec",
  "CNO": "Coino",
  "CNMT": "Coinomat",
  "CXT": "Coinonat",
  "XCXT": "CoinonatX",
  "TCJ": "Coinshare",
  "CEN": "Coinsuper Ecosystem Network",
  "COIN": "Coinvest",
  "CWT": "Coinware",
  "CXG": "Coinxes",
  "COLX": "ColossusCoinXT",
  "CLN": "Colu Local Network",
  "CBP": "ComBox",
  "CMTC": "CometCoin",
  "CBT": "CommerceBlock Token",
  "CMM": "Commercium",
  "COMM": "Community Coin",
  "COC": "Community Coin",
  "CMP": "Compcoin",
  "COMP": "Compound Coin",
  "CPN": "CompuCoin",
  "CYC": "ConSpiracy Coin",
  "CNL": "ConcealCoin",
  "RAIN": "Condensate",
  "CFD": "Confido",
  "CJR": "Conjure",
  "CJT": "ConnectJob Token",
  "CTY": "Connecty",
  "CQST": "ConquestCoin",
  "SEN*": "Consensus",
  "DAG": "Constellation",
  "CNN": "Content Neutrality Network",
  "CAN*": "Content and AD Network",
  "BOX": "ContentBox",
  "COS": "Contentos",
  "CUZ": "Cool Cousin",
  "COOL": "CoolCoin",
  "CCX": "CoolDarkCoin",
  "XCPO": "Copico",
  "CLR": "CopperLark",
  "CORAL": "CoralPay",
  "CORE": "Core Group Asset",
  "COR": "Corion",
  "CTXC": "Cortex",
  "COSX": "Cosmecoin",
  "CSMIC": "Cosmic",
  "CMOS": "Cosmo",
  "COSM": "CosmoChain",
  "ATOM*": "Cosmos",
  "CMC": "CosmosCoin",
  "COU": "Couchain",
  "XCP": "CounterParty",
  "CHT": "Countinghouse Fund",
  "COV*": "CovenCoin",
  "COV": "Covesting",
  "CPLO": "Cpollo",
  "CRAB": "CrabCoin",
  "CRACK": "CrackCoin",
  "CRAFT": "Craftcoin",
  "CFTY": "Crafty",
  "CRAIG": "CraigsCoin",
  "CRNK": "CrankCoin",
  "CRAVE*": "Crave-NG",
  "CRAVE": "CraveCoin",
  "CRV": "Cravy",
  "CZC": "Crazy Coin",
  "CRM": "Cream",
  "XCRE": "Creatio",
  "CREA": "CreativeChain",
  "CRDNC": "Credence Coin",
  "PESA": "Credible",
  "CREDIT": "Credit",
  "CRB": "Creditbit",
  "CRE*": "Creditcoin",
  "CCOIN": "Creditcoin",
  "CDPT": "Creditor Data Platform",
  "CRE": "Credits",
  "CRDS": "Credits",
  "CS*": "Credits",
  "CFT*": "Credo",
  "CREDO": "Credo",
  "CREVA": "Creva Coin",
  "CROAT": "Croat",
  "CMCT": "Crowd Machine",
  "CRC***": "CrowdCoin",
  "CCOS": "CrowdCoinage",
  "CRF": "CrowdForce",
  "CDP": "CrowdPrecision",
  "YUP": "Crowdholding",
  "WIZ": "Crowdwiz",
  "CRW": "Crown Coin",
  "CRC**": "CryCash",
  "IPT": "Crypt-ON",
  "CRYPT": "CryptCoin",
  "CPT": "Cryptaur",
  "CRL": "Cryptelo Coin",
  "CRPT": "Crypterium",
  "XCR": "Crypti",
  "CRYP": "CrypticCoin",
  "QRP": "Cryptics",
  "CTO": "Crypto",
  "ANGEL": "Crypto Angel",
  "CESC": "Crypto Escudo",
  "CIF": "Crypto Improvement Fund",
  "CSPN": "Crypto Sports",
  "TKT": "Crypto Tickets",
  "CWEX": "Crypto Wine Exchange",
  "CWIS": "Crypto Wisdom Coin",
  "CWX": "Crypto-X",
  "MCO": "Crypto.com",
  "CRO": "Crypto.com Chain Token",
  "C20": "Crypto20",
  "CABS": "CryptoABS",
  "BUK": "CryptoBuk",
  "CBX": "CryptoBullion",
  "CCRB": "CryptoCarbon",
  "CIRC": "CryptoCircuits",
  "FCS": "CryptoFocus",
  "CFT": "CryptoForecast",
  "CHBR": "CryptoHub",
  "TKR": "CryptoInsight",
  "CJ": "CryptoJacks",
  "CJC": "CryptoJournal",
  "LEU": "CryptoLEU",
  "CPAY": "CryptoPay",
  "CRPS": "CryptoPennies",
  "PING": "CryptoPing",
  "CP": "CryptoProfile",
  "CREV": "CryptoRevolution",
  "CR": "CryptoRiyal",
  "CS": "CryptoSpots",
  "CWV": "CryptoWave",
  "CWXT": "CryptoWorldXToken",
  "CRON": "Cryptocean",
  "CCIN": "Cryptocoin Insurance",
  "CDX*": "Cryptodex",
  "CGA": "Cryptographic Anomaly",
  "CIX100": "Cryptoindex",
  "CYT": "Cryptokenz",
  "CIX": "Cryptonetix",
  "CNX": "Cryptonex",
  "XCN": "Cryptonite",
  "CEFS": "CryptopiaFeeShares",
  "CRS": "Cryptoreal",
  "CXA": "CryptovationX",
  "OXY2": "Cryptoxygen",
  "MN": "Cryptsy Mining Contract",
  "POINTS": "Cryptsy Points",
  "CRTM": "Cryptum",
  "CVCOIN": "Crypviser",
  "CCT": "Crystal Clear Token",
  "AUTO": "Cube",
  "QBT": "Cubits",
  "CUR": "Cura Network",
  "CTKN": "Curaizon",
  "CURE": "Curecoin",
  "CRU": "Curium",
  "CBUK": "CurveBlock",
  "CHFT": "CustomCoin",
  "CCL": "CyClean",
  "XCS": "CybCSec Coin",
  "CCI": "Cyber Capital Invest",
  "CC": "CyberCoin",
  "CMT": "CyberMiles",
  "CABS*": "CyberTrust",
  "CVT": "CyberVein",
  "CRE**": "Cybereits Token",
  "CYDER": "Cyder Coin",
  "CYG": "Cygnus",
  "CYP": "CypherPunkCoin",
  "FUNK": "Cypherfunks Coin",
  "CYRS": "Cyrus Token",
  "DACH": "DACH Coin",
  "DAC": "DACash",
  "DADI": "DADI",
  "DAX": "DAEX",
  "BET*": "DAO.casino",
  "GEN*": "DAOstack",
  "DAPS": "DAPS Token",
  "DAS": "DAS",
  "DATX": "DATx",
  "DAV*": "DAV",
  "DRP": "DCORP",
  "DEEX": "DEEX",
  "CET*": "DICE Money",
  "DIM": "DIMCOIN",
  "DIW": "DIWtoken",
  "DMT": "DMarket",
  "DNTX": "DNAtix",
  "DNN": "DNN Token",
  "MTC": "DOCADEMIC",
  "DOV": "DOVU",
  "DREAM*": "DREAM",
  "DRPU": "DRP Utility",
  "DRACO": "DT Token",
  "DYNO": "DYNO",
  "DAI": "Dai",
  "DAN": "Daneel",
  "DXC*": "Daox",
  "DAR": "Darcrus",
  "PROD": "Darenta",
  "DEC": "Darico",
  "DARK": "Dark",
  "DISK": "Dark Lisk",
  "MOOND": "Dark Moon",
  "DB": "DarkBit",
  "DRKC": "DarkCash",
  "DCC": "DarkCrave",
  "DETH": "DarkEther",
  "DGDC": "DarkGold",
  "DKC": "DarkKnightCoin",
  "DANK": "DarkKush",
  "DSB": "DarkShibe",
  "DT": "DarkToken",
  "DRKT": "DarkTron",
  "DNET": "Darknet",
  "DASC": "DasCoin",
  "DASH": "Dash",
  "DSH": "Dashcoin",
  "DTA": "Data",
  "DTT*": "Data Trading",
  "DTX": "DataBroker DAO",
  "DXT": "DataWallet",
  "DTB": "Databits",
  "DBCCOIN": "Datablockchain",
  "DTC*": "Datacoin",
  "XDT": "Dataeum",
  "DTN": "Datareum",
  "DTRC": "Datarius",
  "DAT": "Datum",
  "DAV": "DavorCoin",
  "DAXX": "DaxxCoin",
  "DTC": "DayTrader Coin",
  "DAYTA": "Dayta",
  "DHT": "DeHedge Token",
  "DNET*": "DeNet",
  "XNA": "DeOxyRibose",
  "DBC*": "Debit Coin",
  "DBTC": "DebitCoin",
  "DEB": "Debitum Token",
  "DCT": "Decent",
  "DBET": "Decent.bet",
  "MANA": "Decentraland",
  "DACC": "Decentralized Accessible Content Chain",
  "DML": "Decentralized Machine Learning",
  "DUBI": "Decentralized Universal Basic Income",
  "HST": "Decision Token",
  "DCR": "Decred",
  "DEEP": "Deep Gold",
  "DBC": "DeepBrain Chain",
  "ONION": "DeepOnion",
  "DEA": "Degas Coin",
  "DEI": "Deimos",
  "DKD": "Dekado",
  "DEL": "DelChain",
  "DPAY": "DelightPay",
  "DPT": "Deliverers Power Token",
  "DPY": "Delphy",
  "DLXV": "Delta-X",
  "DCRE": "DeltaCredits",
  "DNR": "Denarius",
  "DNO": "Denaro",
  "DENT": "Dent",
  "DCN": "Dentacoin",
  "DFBT": "DentalFix",
  "DEPO": "Depository Network",
  "DERO": "Dero",
  "DESI": "Desico",
  "DSR": "Desire",
  "DES": "Destiny",
  "DTCT": "DetectorToken",
  "DTH": "Dether",
  "DVC": "DevCoin",
  "EVE": "Devery",
  "DEV": "Deviant Coin",
  "DXG": "DexAge",
  "DMD": "Diamond",
  "DCK": "DickCoin",
  "DIGS": "Diggits",
  "DGB": "DigiByte",
  "DGC": "DigiCoin",
  "CUBE": "DigiCube",
  "DEUR": "DigiEuro",
  "DIGIF": "DigiFel",
  "DFXT": "DigiFinexToken",
  "DGM": "DigiMoney",
  "DGPT": "DigiPulse",
  "DGMS": "Digigems",
  "DAGT": "Digital Asset Guarantee Token",
  "DPP": "Digital Assets Power Play",
  "DBG": "Digital Bullion Gold",
  "DDF": "Digital Developers Fund",
  "DFS": "Digital Fantasy Sports",
  "TMTG": "Digital Gold Exchange",
  "DRS": "Digital Rupees",
  "XDN": "DigitalNote",
  "DP": "DigitalPrice",
  "DGTX": "Digitex Futures",
  "WAGE": "Digiwage",
  "DGD": "Digix DAO",
  "DGX": "Digix Gold token",
  "DIG": "Dignity",
  "DIME": "DimeCoin",
  "DCY": "Dinastycoin",
  "DIN": "Dinero",
  "XDQ": "Dirac Coin",
  "DIS": "DiscoveryIoT",
  "DCC*": "Distributed Credit Chain",
  "DIT": "Ditcoin",
  "DIVX": "Divi Exchange Token",
  "DIVI": "Divi Project",
  "DTC**": "DivotyCoin",
  "DXC": "DixiCoin",
  "DLISK": "Dlisk",
  "NOTE": "Dnotes",
  "DOC": "Doc Coin",
  "NRN": "Doc.ai Neuron",
  "DOCK": "Dock.io",
  "DOGED": "DogeCoinDark",
  "DGORE": "DogeGoreCoin",
  "XDP": "DogeParty",
  "DOGE": "Dogecoin",
  "DLA": "Dolla",
  "DT1": "Dollar Token 1",
  "DLC": "DollarCoin",
  "DLR": "DollarOnline",
  "DRT": "DomRaider",
  "DON": "DonationCoin",
  "DDL": "Donocle",
  "DOPE": "DopeCoin",
  "DOR": "Dorado",
  "DOT": "Dotcoin",
  "BOAT": "Doubloon",
  "Dow": "DowCoin",
  "DRA": "DraculaCoin",
  "DFT": "Draftcoin",
  "DRG": "Dragon Coin",
  "XDB": "DragonSphere",
  "DRGN": "Dragonchain",
  "DRM8": "Dream8Coin",
  "DREAM": "DreamTeam Token",
  "DRF": "Drife",
  "DRZ": "Droidz",
  "DRC": "Dropcoin",
  "DROP": "Dropil",
  "DRXNE": "Droxne",
  "DUB": "DubCoin",
  "DBIC": "DubaiCoin",
  "DBIX": "DubaiCoin",
  "DUCK": "DuckDuckCoin",
  "DUSK": "Dusk Network",
  "DUTCH": "Dutch Coin",
  "DUX": "DuxCoin",
  "DYC": "Dycoin",
  "DYN": "Dynamic",
  "DTR": "Dynamic Trading Rights",
  "DYNCOIN": "Dyncoin",
  "DTEM": "Dystem",
  "DBR": "Düber",
  "ECC*": "E-CurrencyCoin",
  "EDR": "E-Dinar Coin",
  "EFL": "E-Gulden",
  "EB3": "EB3coin",
  "EBC": "EBCoin",
  "ECC": "ECC",
  "OMI": "ECOMI",
  "ECO": "ECOcoin",
  "EDRC": "EDRCoin",
  "EGO": "EGOcoin",
  "EJAC": "EJA Coin",
  "ELTCOIN": "ELTCOIN",
  "EMANATE": "EMANATE",
  "EMX": "EMX",
  "ET": "ENDO",
  "ENTRC": "ENTER COIN",
  "ENTRY": "ENTRY",
  "EOT*": "EON",
  "EOS": "EOS",
  "EPIK": "EPIK Token",
  "EQL": "EQUAL",
  "EQ": "EQUI",
  "EQUI": "EQUI Token",
  "ERB": "ERBCoin",
  "EST": "ESports Chain",
  "XBASE": "ETERBASE",
  "ETS": "ETH Share",
  "ERA": "ETHA",
  "ETHO": "ETHER-1",
  "EGAS": "ETHGAS",
  "EUNO": "EUNO",
  "EVOS": "EVOS",
  "EXMR": "EXMR",
  "EXRN": "EXRNchain",
  "ETE": "EXTRADECOIN",
  "EYE": "EYE Token",
  "EZX": "EZ Exchange",
  "EZC": "EZCoin",
  "EZM": "EZMarket",
  "EZT": "EZToken",
  "EA": "EagleCoin",
  "EAGS": "EagsCoin",
  "EARTH": "Earth Token",
  "EAC": "EarthCoin",
  "EGDC": "EasyGuide",
  "EMT": "EasyMine",
  "ETKN": "EasyToken",
  "EBZ": "Ebitz",
  "EBS": "EbolaShare",
  "EKO": "EchoLink",
  "EC": "Eclipse",
  "ECOB": "EcoBit",
  "ECR": "EcoVerse",
  "EDDIE": "Eddie coin",
  "EDN": "EdenChain",
  "EDGE": "EdgeCoin",
  "EDG": "Edgeless",
  "EDU": "EduCoin",
  "LEDU": "Education Ecosystem",
  "EDC": "EducoinV",
  "EGG": "EggCoin",
  "EGT": "Egretia",
  "EDO": "Eidoo",
  "EMC2": "Einsteinium",
  "ELC": "Elacoin",
  "XEL": "Elastic",
  "ELA": "Elastos",
  "ECA": "Electra",
  "ELEC": "Electrify.Asia",
  "ELT": "Electron",
  "ETN": "Electroneum",
  "EKN": "Elektron",
  "ELE": "Elementrem",
  "ELM": "Elements",
  "ELES": "Elements Estates",
  "ELI*": "Elicoin",
  "ELI": "Eligma",
  "ELIX": "Elixir",
  "ELLA": "Ellaism",
  "ELP": "Ellerium",
  "ELLI": "ElliotCoin",
  "ELY": "Elysian",
  "ELS": "Elysium",
  "AEC*": "EmaratCoin",
  "EMB": "EmberCoin",
  "MBRS": "Embers",
  "EMD": "Emerald",
  "EMC": "Emercoin",
  "EMN": "Eminent Token",
  "EMIGR": "EmiratesGoldCoin",
  "EPY*": "Emphy",
  "PLEO": "Empleos",
  "EMPC": "EmporiumCoin",
  "EPY": "Empyrean",
  "ENCX": "Encrybit",
  "DNA": "EncrypGen",
  "ETT": "EncryptoTel",
  "ENCN": "EndChain",
  "EDR*": "Endor Protocol Token",
  "ENE": "EneCoin",
  "ENQ": "Enecuum",
  "NRG": "Energi",
  "ETK": "Energi Token",
  "TSL": "Energo",
  "ENRG": "EnergyCoin",
  "ENGT": "Engagement Token",
  "EGCC": "Engine",
  "XNG": "Enigma",
  "ENG": "Enigma",
  "ENJ": "Enjin Coin",
  "ENK": "Enkidu",
  "ENTER": "EnterCoin (ENTER)",
  "ENTRP": "Entropy Token",
  "ENU": "Enumivo",
  "ENV": "Envienta",
  "EVN": "Envion",
  "NVOY": "Envoy",
  "ZYM": "Enzym",
  "EQUAL": "EqualCoin",
  "EQT": "EquiTrader",
  "EQB": "Equibit",
  "EQM": "Equilibrium Coin",
  "EQY": "Eqwity",
  "ERE": "Erecoin",
  "EFYT": "Ergo",
  "ERT*": "Eristica",
  "ERO": "Eroscoin",
  "ERR": "ErrorCoin",
  "ERY": "Eryllium",
  "ESP": "Espers",
  "ERT": "Esports.com",
  "ESS": "Essentia",
  "ETALON": "Etalon",
  "XEC": "Eternal Coin",
  "XET": "Eternal Token",
  "ETT*": "Eternal Trusts",
  "ENT": "Eternity",
  "EBET": "EthBet",
  "ETBS": "EthBits",
  "LEND": "EthLend",
  "HEAL": "Etheal",
  "ETHB": "EtherBTC",
  "EDT": "EtherDelta",
  "DOGETH": "EtherDoge",
  "ETI": "EtherInc",
  "ETL": "EtherLite",
  "ESZ": "EtherSportz",
  "ETZ": "EtherZero",
  "ECH": "EthereCash",
  "ETH": "Ethereum",
  "ETBT": "Ethereum Black",
  "BLUE": "Ethereum Blue",
  "ECASH": "Ethereum Cash",
  "ETC": "Ethereum Classic",
  "ETHD": "Ethereum Dark",
  "ETG": "Ethereum Gold",
  "ETHM": "Ethereum Meta",
  "EMV": "Ethereum Movie Venture",
  "ETHPR": "Ethereum Premium",
  "EQC": "Ethereum Qchain Token",
  "LNK": "Ethereum.Link",
  "BTCE": "EthereumBitcoin",
  "ETF": "EthereumFog",
  "ELITE": "EthereumLite",
  "ETHS": "EthereumScrypt",
  "DIP": "Etherisc",
  "RIYA": "Etheriya",
  "DICE": "Etheroll",
  "FUEL": "Etherparty",
  "ESN": "Ethersocial",
  "ESC": "Ethersportcoin",
  "NEC*": "Ethfinex Nectar Token",
  "ETHIX": "EthicHub",
  "HORSE": "Ethorse",
  "ETHOS": "Ethos",
  "ET4": "Eticket4",
  "EUC": "Eurocoin",
  "ECTE": "EurocoinToken",
  "ERC": "EuropeCoin",
  "EVN*": "EvenCoin",
  "EVENT": "Event Token",
  "EVC": "Eventchain",
  "EGC": "EverGreenCoin",
  "EVER": "EverLife.AI",
  "EVX": "Everex",
  "IQ": "Everipedia",
  "EVR": "Everus",
  "EOC": "EveryonesCoin",
  "EVIL": "EvilCoin",
  "EXB": "ExaByte (EXB)",
  "XUC": "Exchange Union",
  "EXCC": "ExchangeCoin",
  "EXN": "ExchangeN",
  "EXCL": "Exclusive Coin",
  "EXE": "ExeCoin",
  "XNT": "Exenium",
  "EXC": "Eximchain",
  "EXIT": "ExitCoin",
  "EXO": "Exosis",
  "EXP": "Expanse",
  "EXPR": "Expercoin",
  "XP": "Experience Points",
  "EXT*": "Experience Token",
  "EXY": "Experty",
  "EON": "Exscudo",
  "TAURI": "Extauri",
  "EXTN": "Extensive Coin",
  "XTRA": "ExtraCredit",
  "ELT*": "ExtraLovers",
  "XSB": "Extreme Sportsbook",
  "XT": "ExtremeCoin",
  "F16": "F16Coin",
  "FARM": "FARM Coin",
  "FX": "FCoin",
  "FIBRE": "FIBRE",
  "eFIC": "FIC Network",
  "FLASH": "FLASH coin",
  "FLIK": "FLiK",
  "FLM": "FOLM coin",
  "FOREX": "FOREXCOIN",
  "FRED": "FREDEnergy",
  "FREE": "FREE coin",
  "FXP": "FXPay",
  "FABA": "Faba Invest",
  "FT": "Fabric Token",
  "FC": "Facecoin",
  "FACE": "Faceter",
  "FTR": "FactR",
  "FCT": "Factoids",
  "FAIR": "FairCoin",
  "FAIR*": "FairGame",
  "FAIRC": "Faireum Token",
  "FAME": "FameCoin",
  "FAN": "Fan360",
  "FANZ": "FanChain",
  "XFT": "Fantasy Cash",
  "FTM": "Fantom",
  "FCN": "FantomCoin",
  "FRD": "Farad",
  "F2K": "Farm2Kitchen",
  "FTT": "FarmaTrust",
  "FST": "FastCoin",
  "FTUM": "Fatum",
  "DROP*": "FaucetCoin",
  "FAZZ": "FazzCoin",
  "FTC": "FeatherCoin",
  "TIPS": "FedoraCoin",
  "FET": "Fetch.AI",
  "FIH": "Fidelity House",
  "FLC": "Fieldcoin",
  "FIII": "Fiii",
  "FIL": "FileCoin",
  "FFM": "Files.fm Library",
  "FILL": "Fillit",
  "FNTB": "FinTab",
  "FNX": "FinanceX",
  "FIND": "FindCoin",
  "FNL": "Finlocale",
  "FIN": "Finom FIN Token",
  "NOM": "Finom NOM Token",
  "FTX": "FintruX",
  "FIRE": "FireCoin",
  "FLOT": "FireLotto",
  "FRC": "FireRoosterCoin",
  "FFC": "FireflyCoin",
  "1ST": "FirstBlood",
  "FIRST": "FirstCoin",
  "FRST": "FirstCoin",
  "FIST": "FistBump",
  "FIT": "Fitcoin",
  "FRV": "Fitrova",
  "FLAP": "Flappy Coin",
  "FLX": "Flash",
  "FLVR": "FlavorCoin",
  "FNP": "FlipNpik",
  "FLIXX": "Flixxo",
  "FLO": "Flo",
  "FLT": "FlutterCoin",
  "FLUZ": "FluzFluz",
  "FLY": "FlyCoin",
  "FYP": "FlypMe",
  "FOAM": "Foam",
  "FLDC": "Folding Coin",
  "FLLW": "Follow Coin",
  "FNO": "Fonero",
  "FONZ": "FonzieCoin",
  "FOOD": "FoodCoin",
  "FOPA": "Fopacoin",
  "FOR": "Force Coin",
  "XFC": "Forever Coin",
  "FML": "FormulA",
  "FFCT": "FortFC",
  "FOTA": "Fortuna",
  "FSBT": "Forty Seven Bank",
  "FOXT": "Fox Trading",
  "FRAC": "FractalCoin",
  "FRN": "Francs",
  "FRK": "Franko",
  "FRWC": "Frankywillcoin",
  "FRAZ": "FrazCoin",
  "FGZ": "Free Game Zone",
  "FRE": "FreeCoin",
  "FRECN": "Freldo",
  "FREC": "Freyrchain",
  "FSC": "FriendshipCoin",
  "FDZ": "Friendz",
  "FUCK": "Fuck Token",
  "FC2": "Fuel2Coin",
  "FJC": "FujiCoin",
  "NTO": "Fujinto",
  "FLS": "Fuloos Coin",
  "FUNC": "FunCoin",
  "FUN": "FunFair",
  "FUND": "Fund Platform",
  "FUNDZ": "FundFantasy",
  "FND": "FundRequest",
  "FYN": "FundYourselfNow",
  "ATON": "Further Network",
  "FSN*": "Fusion",
  "FSN": "Fusion",
  "FUTC": "FutCoin",
  "FTRC": "FutureCoin",
  "FTP": "FuturePoints",
  "FTW": "FutureWorks",
  "FPC": "Futurepia",
  "FTO": "FuturoCoin",
  "FXT": "FuzeX",
  "FUZZ": "Fuzzballs",
  "GAIA": "GAIA Platform",
  "GAKH": "GAKHcoin",
  "GTX": "GALLACTIC",
  "GMB": "GAMB",
  "GAT": "GATCOIN",
  "GBRC": "GBR Coin",
  "GGP": "GGPro",
  "GGR": "GGRocket",
  "GTO": "GIFTO",
  "GIN": "GINcoin",
  "GIZ": "GIZMOcoin",
  "GMC*": "GMC Coin",
  "GPU": "GPU Coin",
  "GSM": "GSM Coin",
  "GXS": "GXChain",
  "GBO": "Gabro.io",
  "GEP": "Gaia",
  "GNR": "Gainer",
  "ORE": "Galactrum",
  "GES": "Galaxy eSolutions",
  "GLX": "GalaxyCoin",
  "GALI": "Galilel",
  "GLN": "Galion Token",
  "GAM": "Gambit coin",
  "GMCN": "GambleCoin",
  "GTC": "Game",
  "GXT": "Game Protocol",
  "GBT": "GameBetCoin",
  "GML": "GameLeagueCoin",
  "GST": "GameStars",
  "UNITS": "GameUnits",
  "GX": "GameX",
  "GAME": "Gamecredits",
  "GDX": "Gamedex",
  "FLP": "Gameflip",
  "GNJ": "GanjaCoin V2",
  "GAP": "Gapcoin",
  "GRLC": "Garlicoin",
  "GAS": "Gas",
  "FORK": "Gastro Advisor Token",
  "GBA": "Geeba",
  "GEMA": "Gemera",
  "GUSD": "Gemini Dollar",
  "GEM": "Gems",
  "GMS": "Gemstra",
  "GEMZ": "Gemz Social",
  "GXC*": "GenXCoin",
  "GNX": "Genaro Network",
  "GENX": "Genesis Network",
  "GVT": "Genesis Vision",
  "XGS": "GenesisX",
  "GSY": "GenesysCoin",
  "GEN": "Genstake",
  "GEO": "GeoCoin",
  "GUNS": "GeoFunders",
  "GEON": "Geon",
  "GER": "GermanCoin",
  "SPKTR": "Ghost Coin",
  "GHC": "GhostCoin",
  "GHOUL": "Ghoul Coin",
  "GIC": "Giant",
  "GIFT": "GiftNet",
  "GFT": "Giftcoin",
  "GIG": "GigCoin",
  "GBTC": "GigTricks",
  "WTT": "Giga Watt",
  "GZB": "Gigzi",
  "GGS": "Gilgam",
  "GIM": "Gimli",
  "GMR": "Gimmer",
  "GGC": "Gingr",
  "GOT": "Giotto Coin",
  "GIVE": "GiveCoin",
  "GLA": "Gladius",
  "GLOBE": "Global",
  "GCR": "Global Currency Reserve",
  "GJC": "Global Jobcoin",
  "GSC": "Global Social Chain",
  "GTC*": "Global Tour Coin",
  "GTIB": "Global Trust Coin",
  "BSTY": "GlobalBoost",
  "GLC": "GlobalCoin",
  "GLT": "GlobalToken",
  "GVE": "Globalvillage Ecosystem",
  "GSI": "Globex SCI",
  "GBXT": "Globitex Token",
  "GSX": "GlowShares",
  "GLYPH": "GlyphCoin",
  "GNO": "Gnosis",
  "xGOx": "Go!",
  "GBX": "GoByte",
  "GO": "GoChain",
  "GOT*": "GoToken",
  "GOA": "GoaCoin",
  "GOAL": "Goal Bonanza",
  "GOAT": "Goat",
  "GBE": "Godbex",
  "GDL": "GodlyCoin",
  "XR": "Gofind XR",
  "GPL": "Gold Pressed Latinum",
  "GRX": "Gold Reward Token",
  "GB": "GoldBlocks",
  "GLD": "GoldCoin",
  "MNTP": "GoldMint",
  "GP": "GoldPieces",
  "XGR": "GoldReserve",
  "GMA": "Goldchip Mining Asset",
  "GEA": "Goldea",
  "XGH": "Golden Hash",
  "XGB": "GoldenBird",
  "GLDR": "Golder Coin",
  "GMX": "Goldmaxcoin",
  "GNT": "Golem Network Token",
  "GOLF": "GolfCoin",
  "GOLOS": "Golos",
  "GBG": "Golos Gold",
  "GOOD": "GoodCoin",
  "GOOD*": "Goodomy",
  "GOON": "Goonies",
  "BUCKS*": "GorillaBucks",
  "GOTX": "GothicCoin",
  "GRFT": "Graft Blockchain",
  "GDC": "GrandCoin",
  "GAI": "GraphGrail AI",
  "77G": "GraphenTech",
  "GRAV": "Graviton",
  "GBIT": "GravityBit",
  "WPP": "Green Energy Token",
  "GRE": "GreenCoin",
  "GRMD": "GreenMed",
  "GEX": "GreenX",
  "GNC": "Greencoin",
  "GTN": "Greentoken",
  "GREXIT": "GrexitCoin",
  "GC": "Gric Coin",
  "GRID": "Grid+",
  "GRC": "GridCoin",
  "GRM": "GridMaster",
  "GMC": "Gridmaster",
  "GRIN": "Grin",
  "GRS": "Groestlcoin",
  "GRO": "Gron Digital",
  "GRWI": "Growers International",
  "GROW": "GrownCoin",
  "GRW": "GrowthCoin",
  "GTR": "Gturbo",
  "GET": "Guaranteed Entrance Token",
  "GETX": "Guaranteed Ethurance Token Extra",
  "GUAR": "Guarium",
  "GCC": "GuccioneCoin",
  "GUE": "GuerillaCoin",
  "NLG": "Gulden",
  "GUN": "GunCoin",
  "GUP": "Guppy",
  "GXC": "Gx Coin",
  "HIDU": "H-Education World",
  "HART": "HARA",
  "HBZ": "HBZ Coin",
  "HIX": "HELIX Orange",
  "HELL": "HELL COIN",
  "HRO": "HEROIC.com",
  "PLAY": "HEROcoin",
  "HOLD": "HOLD",
  "HLDY": "HOLIDAY",
  "HQX": "HOQU",
  "HODL": "HOdlcoin",
  "HTML": "HTML Coin",
  "HTML5": "HTML5 Coin",
  "HUS": "HUSSY",
  "HYC": "HYCON",
  "HYGH": "HYGH",
  "HKN": "Hacken",
  "HKG": "Hacker Gold",
  "HAC": "Hackspace Capital",
  "HPAY": "HadePay",
  "HLC": "Halal-Chain",
  "HAL": "Halcyon",
  "HALLO": "Halloween Coin",
  "HALO": "Halo Platform",
  "HMT": "Hamster Marketplace Token",
  "HAMS": "HamsterCoin",
  "HANA": "Hanacoin",
  "HPC": "HappyCoin",
  "HCC": "HappyCreatorCoin",
  "HRBE": "Harambee Token",
  "HRB": "Harbour DAO",
  "HMN": "Harvest Masternode Coin",
  "HSC": "HashCoin",
  "HGS": "HashGains",
  "HASH": "Hashbon",
  "GARD": "Hashgard",
  "XHV": "Haven Protocol",
  "HAT": "Hawala.Exchange",
  "HZT": "HazMatCoin",
  "HAZE": "HazeCoin",
  "HDAC": "Hdac",
  "HHEM": "Healthureum",
  "WORM": "HealthyWorm",
  "HB": "HeartBout",
  "HEAT": "Heat Ledger",
  "HVC": "HeavyCoin",
  "HDG": "Hedge Token",
  "HEDG": "HedgeTrade",
  "HEDGE": "Hedgecoin",
  "HEEL": "HeelCoin",
  "HYS": "Heiss Shares",
  "HLM": "Helium",
  "HLX": "Helix3",
  "HNC": "Hellenic Coin",
  "HGT": "Hello Gold",
  "HMP": "HempCoin",
  "HERB": "HerbCoin",
  "HERO": "Hero",
  "HER": "Hero Node",
  "HETA": "HetaChain",
  "HEX": "HexCoin",
  "HXC": "HexanCoin",
  "HXT": "HextraCoin",
  "HXX": "HexxCoin",
  "HMC": "Hi Mutual Society",
  "XHI": "HiCoin",
  "HIH": "HiHealth",
  "HPB": "High Performance Blockchain",
  "HVCO": "High Voltage Coin",
  "AIMS": "HighCastle Token",
  "HV": "HighVibe.Network",
  "HGO": "HireGo",
  "HIRE": "HireMatch",
  "HFT": "Hirefreehands",
  "HIT": "HitChain",
  "HTC": "Hitcoin",
  "HIVE": "Hive",
  "HVN": "Hiveterminal Token",
  "HBN": "HoboNickels",
  "HWC": "HollyWoodCoin",
  "HOT*": "Holo",
  "HBC": "HomeBlockCoin",
  "HMD": "Homelend",
  "HONEY": "Honey",
  "HZ": "Horizon",
  "HSP": "Horse Power",
  "HORUS": "HorusPay",
  "HYT": "HoryouToken",
  "HSR": "Hshare",
  "HBT": "Hubii Network",
  "HMQ": "Humaniq",
  "HNC*": "Huncoin",
  "HUC": "HunterCoin",
  "HT": "Huobi Token",
  "HUR": "Hurify",
  "HUSH": "Hush",
  "HOT": "Hydro Protocol",
  "HYDRO": "Hydrogen",
  "H2O": "Hydrominer",
  "H3O": "Hydrominer",
  "HC": "HyperCash",
  "HYPER": "HyperCoin",
  "HLD": "HyperLending",
  "HQT": "HyperQuant",
  "HBX": "Hyperbridge",
  "TREE": "HyperionX",
  "HPSP": "Hyperspace",
  "HYP": "Hyperstake",
  "IHT": "I-House Token",
  "I0C": "I0coin",
  "IAG": "IAGON",
  "IAM": "IAME Identity",
  "ICASH": "ICASH",
  "ICOO": "ICO OpenLedger",
  "ICOS": "ICOBox",
  "ICX": "ICON Project",
  "ICST": "ICST",
  "IDAC": "IDAC",
  "IDAP": "IDAP",
  "IDXM": "IDEX Membership",
  "IDM": "IDM",
  "IG": "IG Token",
  "IGTT": "IGT",
  "ILC": "ILCoin",
  "ILCT": "ILCoin Token",
  "IML": "IMMLA",
  "ITR": "INTRO",
  "IOC": "IOCoin",
  "IOST": "IOS token",
  "IOT": "IOTA",
  "IOTW": "IOTW",
  "IOUX": "IOU",
  "IOU": "IOU1",
  "IOV": "IOV",
  "IPSX": "IP Exchange",
  "IPC*": "IPChain",
  "IQN": "IQeon",
  "IRC": "IRONCOIN",
  "IVN": "IVN Security",
  "IXC": "IXcoin",
  "IZX": "IZX",
  "ROCK2": "Ice Rock Mining",
  "ICB": "IceBergCoin",
  "ICHX": "IceChain",
  "ICOB": "Icobid",
  "ICON": "Iconic",
  "ICN": "Iconomi",
  "IDC": "IdealCoin",
  "IGNIS": "Ignis",
  "IC": "Ignition",
  "REX": "Imbrex",
  "IMGZ": "Imigize",
  "IMVR": "ImmVRse",
  "IMX": "Impact",
  "IMPCH": "Impeach",
  "IPC": "ImperialCoin",
  "XIM": "Impresso",
  "IMPS": "Impulse Coin",
  "IN": "InCoin",
  "INX": "InMax",
  "NKA": "IncaKoin",
  "INCNT": "Incent",
  "INCP": "InceptionCoin",
  "INC": "Incrementum",
  "IDH": "IndaHash",
  "IMS": "Independent Money System",
  "ERC20": "Index ERC20",
  "INDI": "IndiCoin",
  "IND": "Indorse",
  "IFX": "Infinex",
  "IFC": "Infinite Coin",
  "XIN": "Infinity Economics",
  "INF8": "Infinium-8",
  "IFLT": "InflationCoin",
  "IFUM": "Infleum",
  "INFLR": "Inflr",
  "INTO": "Influ Token",
  "INFX": "Influxcoin",
  "INK": "Ink",
  "XNK": "Ink Protocol",
  "ILK": "Inlock",
  "SOUND": "Inmusik",
  "INN": "Innova",
  "MINX": "InnovaMinex",
  "INSN": "Insane Coin",
  "INSANE": "InsaneCoin",
  "WOLF": "Insanity Coin",
  "INSTAR": "Insights Network",
  "INS": "Insolar",
  "ICC": "Insta Cash Coin",
  "MINE": "Instamine Nuggets",
  "SPON": "Instant Sponsor Token",
  "INSUR": "InsurChain Coin",
  "IPL": "InsurePal",
  "ISR": "Insureum",
  "IQB": "Intelligence Quotient Benefit",
  "ITT": "Intelligent Trading",
  "XID*": "International Diamond Coin",
  "INT": "Internet Node Token",
  "IOP": "Internet of People",
  "INXT": "Internxt",
  "ISH": "Interstellar Holdings",
  "ITZ": "Interzone",
  "ICT": "Intrachain",
  "INV*": "Invacio",
  "IDT": "InvestDigital",
  "IFT": "InvestFeed",
  "INVX": "Investx",
  "IVC": "Investy Coin",
  "INV": "Invictus",
  "IHF": "Invictus Hyperion Fund",
  "IVZ": "InvisibleCoin",
  "INVOX": "Invox Finance",
  "IZA": "Inzura",
  "ITC": "IoT Chain",
  "IOTX": "IoTeX Network",
  "ION": "Ionomy",
  "TLU": "Irene Energy",
  "IRL": "IrishCoin",
  "ISL": "IslaCoin",
  "ITL": "Italian Lira",
  "ITA": "Italocoin",
  "ING": "Iungo",
  "IEC": "IvugeoEvolutionCoin",
  "IVY": "IvyKoin",
  "IWT": "IwToken",
  "J8T": "JET8",
  "JEX": "JEX Token",
  "JIO": "JIO Token",
  "JOYS": "JOYS",
  "JOY*": "JOYSO",
  "JSE": "JSEcoin",
  "JANE": "JaneCoin",
  "JNS": "Janus",
  "JVY": "Javvy",
  "JC": "JesusCoin",
  "JET": "Jetcoin",
  "JWL": "Jewels",
  "JIB": "Jibbit",
  "JNT": "Jibrel Network Token",
  "JIF": "JiffyCoin",
  "JCR": "Jincor",
  "JINN": "Jinn",
  "JOBS": "JobsCoin",
  "J": "JoinCoin",
  "JOINT": "Joint Ventures",
  "JOK": "JokerCoin",
  "XJO": "JouleCoin",
  "JOYT": "JoyToken",
  "JOY": "Joycoin",
  "JUDGE": "JudgeCoin",
  "JBS": "JumBucks Coin",
  "JUMP": "Jumpcoin",
  "JKC": "JunkCoin",
  "JMC": "Junson Ming Chan Coin",
  "JDC": "JustDatingSite",
  "KSYS": "K-Systems",
  "KAAS": "KAASY.AI",
  "KAT": "KATZcoin",
  "KEC": "KEYCO",
  "KIBIS": "KIBIS",
  "TOS": "KRATOS",
  "KRC": "KRCoin",
  "KREDS": "KREDS",
  "KUBO": "KUBO",
  "KWH": "KWHCoin",
  "KZC": "KZCash",
  "KLKS": "Kalkulus",
  "KAPU": "Kapu",
  "KBC": "Karatgold coin",
  "KRB": "Karbo",
  "KRM": "Karma",
  "KARMA": "Karma",
  "K2G": "Kasko2go",
  "KAYI": "Kayi",
  "KCASH": "Kcash",
  "KEK": "KekCoin",
  "KEN": "Kencoin",
  "KEP": "Kepler",
  "KC": "Kernalcoin",
  "KETAN": "Ketan",
  "KEX": "KexCoin",
  "KEY*": "KeyCoin",
  "KMX": "KiMex",
  "KICK": "KickCoin",
  "KLC": "KiloCoin",
  "KIN": "Kin",
  "KIND": "Kind Ads",
  "KVT": "Kinesis Velocity Token",
  "KING": "King93",
  "KNC**": "KingN Coin",
  "MEOW": "Kittehcoin",
  "KLK": "Klickzie",
  "KED": "Klingon Empire Darsek",
  "KDC": "Klondike Coin",
  "KNW": "Knowledge",
  "KOBO": "KoboCoin",
  "KOLION": "Kolion",
  "KMD": "Komodo",
  "KORE": "Kore",
  "KOTO": "Koto",
  "KUSD": "Kowala",
  "KRAK": "Kraken",
  "KRONE": "Kronecoin",
  "KSS": "Krosscoin",
  "KGC": "KrugerCoin",
  "KRL": "Kryll",
  "KTK": "KryptCoin",
  "KRP": "Kryptoin",
  "KR": "Krypton",
  "KBX": "KuBitX",
  "KBR": "Kubera Coin",
  "KUBOS": "KubosCoin",
  "KCS": "Kucoin",
  "KUE": "Kuende",
  "KURT": "Kurrent",
  "KUSH": "KushCoin",
  "KUV": "Kuverit",
  "KVT*": "Kvantor",
  "KNC": "Kyber Network",
  "LAX": "LAPO",
  "LA": "LATOKEN",
  "LBC": "LBRY Credits",
  "LAO": "LC Token",
  "LEO": "LEOcoin",
  "LGBTQ": "LGBTQoin",
  "LHC": "LHCoin",
  "LIFE": "LIFE",
  "LN": "LINK",
  "LNKC": "LINKCHAIN",
  "VEEN": "LIVEEN",
  "LIPC": "LIpcoin",
  "LTBC": "LTBCoin",
  "LTO": "LTO Network",
  "LUMA": "LUMA Token",
  "LUX": "LUXCoin",
  "LVX": "LVX",
  "LYN": "LYNCHPIN Token",
  "LALA": "LaLa World",
  "LBR": "LaborCrypto",
  "LAB": "Labrys",
  "BAC*": "LakeBanker",
  "TAU": "Lamden Tau",
  "PIX": "Lampix",
  "LANA": "LanaCoin",
  "AXIS": "LaneAxis",
  "LTH": "Lathaan",
  "LAT": "Latium",
  "LATX": "LatiumX",
  "LAZ": "Lazarus",
  "LEPEN": "LePenCoin",
  "LEA": "LeaCoin",
  "LDC": "LeadCoin",
  "LEAF": "LeafCoin",
  "LGD": "Legends Cryptocurrency",
  "LGO": "Legolas Exchange",
  "LELE": "Lelecoin",
  "LEMON": "LemonCoin",
  "LCT": "LendConnect",
  "LND": "Lendingblock",
  "LOAN": "Lendoit",
  "LST": "Lendroid Support Token",
  "LENIN": "LeninCoin",
  "LIR": "Let it Ride",
  "LTHN": "Lethean",
  "LVL*": "LevelNet Token",
  "LVG": "Leverage Coin",
  "LEV": "Leverj",
  "XLC": "LeviarCoin",
  "LIB": "Libellum",
  "XLB": "LibertyCoin",
  "LBA": "Libra Credit",
  "LXC": "LibrexCoin",
  "LIGER": "Ligercoin",
  "LSD": "LightSpeedCoin",
  "LPC*": "Lightpaycoin",
  "LIKE": "LikeCoin",
  "LK": "Liker",
  "LIMX": "LimeCoinX",
  "LTD": "Limited Coin",
  "LINDA": "Linda",
  "LET": "LinkEye",
  "LNC*": "Linker Coin",
  "LINX": "Linx",
  "LIPS": "LipChain",
  "LEN": "Liqnet",
  "LQD": "Liquid",
  "LQ8": "Liquid8",
  "LQDN": "Liquidity Network",
  "LSK": "Lisk",
  "LTCC": "Listerclassic Coin",
  "LBTC": "LiteBitcoin",
  "LTG": "LiteCoin Gold",
  "LTCU": "LiteCoin Ultra",
  "LCWP": "LiteCoinW Plus",
  "LTCR": "LiteCreed",
  "LDOGE": "LiteDoge",
  "LTB": "Litebar",
  "LTC": "Litecoin",
  "LTCH": "Litecoin Cash",
  "LCP": "Litecoin Plus",
  "LCASH": "LitecoinCash",
  "LCC": "LitecoinCash",
  "LTCD": "LitecoinDark",
  "LTCP": "LitecoinPro",
  "LTCX": "LitecoinX",
  "LTZ": "Litecoinz",
  "LNT": "Litenett",
  "LTS": "Litestar Coin",
  "LIT": "Lithium",
  "LITION": "Lition",
  "LTA": "Litra",
  "LPC": "Little Phil",
  "LIVE": "Live Stars",
  "LVN": "LivenPay",
  "LPT": "Livepeer",
  "LIV": "LiviaCoin",
  "LIZ": "Lizus Payment",
  "LTE": "Local Token Exchange",
  "LWF": "Local World Forwarders",
  "LCS": "LocalCoinSwap",
  "LOCI": "LociCoin",
  "LOC*": "LockTrip",
  "LOC": "Loco",
  "LGR": "Logarithm",
  "LOKI": "Loki",
  "LLG": "Loligo",
  "LMC": "LomoCoin",
  "LOOK": "LookCoin",
  "LOOM": "Loom Network",
  "LRC": "Loopring",
  "LOT": "LottoCoin",
  "LYK": "Loyakk Vega",
  "LYL": "LoyalCoin",
  "BASH": "LuckChain",
  "LCK": "Luckbox",
  "LK7": "Lucky7Coin",
  "LUCKY": "LuckyBlocks",
  "LKY": "LuckyCoin",
  "LCR": "Lucre",
  "LDM": "Ludum token",
  "LNL": "LunarLink",
  "LUN": "Lunyr",
  "LC": "Lutetium Coin",
  "LUX**": "Luxmi Coin",
  "LYC": "LycanCoin",
  "LDN": "Lydiancoin",
  "LYFE": "Lyfe",
  "LKK": "Lykke",
  "LYM": "Lympo",
  "LYNK": "Lynked.World",
  "LYNX": "Lynx",
  "LYB": "LyraBar",
  "M2O": "M2O Token",
  "MDN": "MADANA",
  "MAKE": "MAKE",
  "MRK": "MARK.SPACE",
  "MCAP": "MCAP",
  "MCV": "MCV Token",
  "MTEL": "MEDoctor",
  "MEETONE": "MEET.ONE",
  "MFX": "MFChain",
  "MIMI": "MIMI Money",
  "MIODIO": "MIODIOCOIN",
  "MIS": "MIScoin",
  "MILC": "MIcro Licensing Coin",
  "MMNXT": "MMNXT",
  "MMO": "MMOCoin",
  "MMXVI": "MMXVI",
  "MOAC": "MOAC",
  "MOBU": "MOBU",
  "MODEX": "MODEX Token",
  "MOS": "MOS Coin",
  "XDMC": "MPCX",
  "MSD": "MSD",
  "MTCMN": "MTC Mesh",
  "MUN": "MUNcoin",
  "MUSD": "MUSDcoin",
  "MUST": "MUST Protocol",
  "MVL": "MVL",
  "YCE": "MYCE",
  "MAC": "MachineCoin",
  "MCRN": "MacronCoin",
  "MRV": "Macroverse",
  "MDC*": "MadCoin",
  "ART": "Maecenas",
  "MAP": "Maester Protocol",
  "MAG**": "Maggie Token",
  "MGN": "MagnaCoin",
  "MAG": "Magnet",
  "MAG*": "Magos",
  "MAID": "MaidSafe Coin",
  "MMXIV": "MaieutiCoin",
  "MNC": "MainCoin",
  "MFT": "Mainframe",
  "MSC*": "MaisCoin",
  "MIV": "MakeItViral",
  "MKR": "Maker",
  "MAT*": "Manet Coin",
  "MANNA": "Manna",
  "MAPC": "MapCoin",
  "MAR": "MarijuanaCoin",
  "MASP": "Market.space",
  "MRS": "MarsCoin",
  "MARS": "MarsCoin",
  "MXT": "MartexCoin",
  "MARV": "Marvelous",
  "MARX": "MarxCoin",
  "MARYJ": "MaryJane Coin",
  "MSR": "Masari",
  "MC": "Mass Coin",
  "MASS": "Mass.Cloud",
  "MGD": "MassGrid",
  "MCAR": "MasterCar",
  "MSC": "MasterCoin",
  "MM": "MasterMint",
  "MTR": "MasterTraderCoin",
  "MAN*": "Matrix AI Network",
  "MTX": "Matryx",
  "MPG": "Max Property Group",
  "MAX": "MaxCoin",
  "MYC": "MayaCoin",
  "MZC": "MazaCoin",
  "MBIT": "Mbitbooks",
  "MLITE": "MeLite",
  "MDT*": "Measurable Data Token",
  "MED*": "MediBloc",
  "MEDI": "MediBond",
  "MCU": "MediChain",
  "MDS": "MediShares",
  "MNT*": "Media Network Coin",
  "MPT": "Media Protocol Token",
  "MEDX": "Mediblock",
  "MDC": "MedicCoin",
  "MEDIC": "MedicCoin",
  "MTN*": "Medicalchain",
  "MHP": "MedicoHealth",
  "MED": "MediterraneanCoin",
  "MPRO": "MediumProject",
  "MEC": "MegaCoin",
  "MEGA": "MegaFlash",
  "XMS": "Megastake",
  "MEL": "Melior AI",
  "MLN": "Melon",
  "MBN": "Membrana",
  "MET": "Memessenger",
  "EMT*": "Memority",
  "MMC": "MemoryCoin",
  "MPAY": "Menapay",
  "ONE": "Menlo One",
  "MENU": "MenuBuzz",
  "MRN": "Mercoin",
  "MVP": "Merculet",
  "MER": "Mercury",
  "GMT": "Mercury Protocol",
  "MHC": "MetaHash",
  "METM": "MetaMorph",
  "META": "Metadium",
  "MTL": "Metal",
  "MTLM3": "Metal Music v3",
  "METAL": "MetalCoin",
  "ETP": "Metaverse",
  "MET*": "Metronome",
  "MIT": "MiMiner",
  "MBTC": "MicroBitcoin",
  "AMM": "MicroMoney",
  "MDT": "Midnight",
  "MON": "MilionCoin",
  "MUU": "MilkCoin",
  "MIL": "Milllionaire Coin",
  "MILO": "MiloCoin",
  "MINC": "MinCoin",
  "MG": "Mind Gene",
  "MND": "MindCoin",
  "MIC": "Mindexcoin",
  "MAI": "Mindsync",
  "MINT*": "Mineable Token",
  "MIO": "Miner One token",
  "MIN": "Minerals Coin",
  "MNE": "Minereum",
  "MRT": "MinersReward",
  "MNM": "Mineum",
  "MINEX": "Minex",
  "MNX": "MinexCoin",
  "MAT": "MiniApps",
  "MNTS": "Mint",
  "MINT": "MintCoin",
  "BIP": "Minter",
  "MITH": "Mithril",
  "XIN*": "Mixin",
  "MIB": "Mobile Integrated Blockchain",
  "CHF*": "MobileBridge Momentum",
  "MGO": "MobileGo",
  "MOLK": "Mobilink Token",
  "MOBI": "Mobius",
  "MTRC": "ModulTrade",
  "MDL*": "Modulum",
  "MOD": "Modum",
  "MDA": "Moeda",
  "MOIN": "MoinCoin",
  "MOJO": "Mojocoin",
  "MOF": "Molecular Future",
  "MOL": "Molecule",
  "TAB": "MollyCoin",
  "MMTM": "Momentum",
  "MONA": "MonaCoin",
  "MNZ": "Monaize",
  "XMR": "Monero",
  "ZMR": "Monero 0",
  "XMC": "Monero Classic",
  "XMRG": "Monero Gold",
  "XMO": "Monero Original",
  "XMV": "MoneroV",
  "MONETA": "Moneta",
  "MNV": "MonetaVerde",
  "MUE": "MonetaryUnit",
  "MTH": "Monetha",
  "MTZ": "Monetizr",
  "MNB": "MoneyBag",
  "MONEY": "MoneyCoin",
  "MRP*": "MoneyRebel",
  "IMT": "MoneyToken",
  "MNY": "Monkey",
  "MONK": "Monkey Project",
  "XMCC": "Monoeci",
  "MNR": "Monoreto",
  "MBI": "Monster Byte Inc",
  "MBLC": "Mont Blanc",
  "MOON": "MoonCoin",
  "LX": "Moonlight",
  "MZG": "Moozicore",
  "MITX": "Morpheus Infrastructure Token",
  "MRPH": "Morpheus Network",
  "MRP": "MorpheusCoin",
  "MZX": "Mosaic Network",
  "MOAT": "Mother Of All Tokens",
  "MSP": "Mothership",
  "XMN": "Motion",
  "MTN**": "Motion",
  "MOTO": "Motocoin",
  "MOV": "MovieCoin",
  "MTK": "Moya Token",
  "MRSA": "MrsaCoin",
  "MUDRA": "MudraCoin",
  "MTT": "MulTra",
  "MLT": "MultiGames",
  "MWC": "MultiWallet Coin",
  "MBT": "Multibot",
  "MTCN": "Multiven",
  "MRY": "MurrayCoin",
  "MUSE": "Muse",
  "MITC": "MusicLife",
  "MUSIC": "Musicoin",
  "MCI": "Musiconomi",
  "MST": "MustangCoin",
  "MUT": "Mutual Coin",
  "MBC": "My Big Coin",
  "MYB": "MyBit",
  "MCB": "MyCryptoBank",
  "MYDFS": "MyDFS",
  "MAZC": "MyMazzu",
  "MT*": "MyToken",
  "WISH": "MyWish",
  "MT": "Mycelium Token",
  "MYO": "Mycro",
  "MPXT": "Myplacex",
  "XMY": "MyriadCoin",
  "MYST": "Mysterium",
  "NANJ": "NANJCOIN",
  "XEM": "NEM",
  "NEO": "NEO",
  "NEOG": "NEO Gold",
  "NEXO": "NEXO",
  "NOX": "NITRO",
  "NIX": "NIX",
  "NKN": "NKN",
  "NOAH": "NOAHCOIN",
  "NBAR": "NOBAR",
  "NOIA": "NOIA Network",
  "NOIZ": "NOIZ",
  "CHFN": "NOKU CHF",
  "EURN": "NOKU EUR",
  "NOKU": "NOKU Master token",
  "NSP": "NOMAD.space",
  "NOW": "NOW Token",
  "NPC": "NPCcoin",
  "NPER": "NPER",
  "NVST": "NVO",
  "NWP": "NWPSolution",
  "NXE": "NXEcoin",
  "NXTI": "NXTI",
  "NXTTY": "NXTTY",
  "NYN": "NYNJA",
  "NYX": "NYXCOIN",
  "NFN": "Nafen",
  "NGC": "NagaCoin",
  "NZE": "Nagezeni",
  "NKT": "NakomotoDark",
  "NAM": "Namacoin",
  "NMH": "Namahe",
  "NMC": "Namecoin",
  "NMK": "Namek",
  "NAMO": "NamoCoin",
  "NANO": "Nano",
  "NHCT": "Nano Healthcare Token",
  "NAN": "NanoToken",
  "NPX": "Napoleon X",
  "NRVE": "Narrative",
  "NAS2": "Nas2Coin",
  "NAUT": "Nautilus Coin",
  "NAV": "NavCoin",
  "NAVI": "NaviAddress",
  "NAVIB": "Navibration",
  "NEBL": "Neblio",
  "NEBU": "Nebuchadnezzar",
  "NBAI": "Nebula AI",
  "NAS": "Nebulas",
  "NDC*": "NeedleCoin",
  "NEF": "NefariousCoin",
  "NRX": "Neironix",
  "NEC": "NeoCoin",
  "NEX": "Neonexchange",
  "NEOS": "NeosCoin",
  "NTCC": "NeptuneClassic",
  "NBIT": "NetBit",
  "NET": "NetCoin",
  "NTM": "NetM",
  "NETKO": "Netko",
  "OUT": "Netscouters",
  "NTWK": "Network Token",
  "NETC": "NetworkCoin",
  "NEU*": "NeuCoin",
  "NEU": "Neumark",
  "NRP": "Neural Protocol",
  "NRO": "Neuro",
  "NRC": "Neurocoin",
  "NRM": "Neuromachine",
  "NTK": "Neurotoken",
  "NTRN": "Neutron",
  "NEVA": "NevaCoin",
  "NDC": "NeverDie",
  "NIC": "NewInvestCoin",
  "NYC": "NewYorkCoin",
  "NZC": "NewZealandCoin",
  "NEWB": "Newbium",
  "NEW": "Newton",
  "NCP": "Newton Coin",
  "NXC": "Nexium",
  "NEXT": "Next.exchange Token",
  "Pakka": "NextPakk",
  "NXS": "Nexus",
  "NEXXO": "Nexxo",
  "NGIN": "Ngin",
  "NICE": "NiceCoin",
  "NIHL": "Nihilo Coin",
  "NMB": "Nimbus Coin",
  "NIMFA": "Nimfamoney",
  "NIM": "Nimiq",
  "NTC": "NineElevenTruthCoin",
  "NDOGE": "NinjaDoge",
  "NBR": "Niobio Cash",
  "NBC": "Niobium",
  "$NOBS": "No BS Crypto",
  "NLC": "NoLimitCoin",
  "NLC2": "NoLimitCoin",
  "NOBL": "NobleCoin",
  "NODE": "Node",
  "NODIS": "Nodis",
  "NVDX": "Nodvix",
  "NRB": "NoirBits",
  "NRS": "NoirShares",
  "NUSD": "Nomin USD",
  "NZO": "NonZero",
  "NOO": "Noocoin",
  "NVC": "NovaCoin",
  "MNVM": "Novam",
  "NWCN": "NowCoin",
  "NBX": "Noxbox",
  "NBT": "NuBits",
  "NSR": "NuShares",
  "NUBIS": "NubisCoin",
  "NCASH": "Nucleus Vision",
  "NUKE": "NukeCoin",
  "NKC": "Nukecoinz",
  "NLX": "Nullex",
  "NULS": "Nuls",
  "N7": "Number7",
  "NUM": "NumbersCoin",
  "NMR": "Numeraire",
  "XNC*": "Numismatic Collections",
  "NMS": "Numus",
  "NXT": "Nxt",
  "NYAN": "NyanCoin",
  "NBL": "Nybble",
  "OATH": "OATH Protocol",
  "ODE": "ODEM",
  "ODMC": "ODMCoin",
  "OK": "OKCash",
  "OKOIN": "OKOIN",
  "ONAM": "ONAM",
  "OPC": "OP Coin",
  "OPP*": "OPP Open WiFi",
  "ORET": "ORET Token",
  "ORM": "ORIUM",
  "ORS": "ORS Group",
  "OASC": "Oasis City",
  "OBITS": "Obits Coin",
  "OBS": "Obscurebay",
  "ODN": "Obsidian",
  "OCL": "Oceanlab",
  "OTX": "Octanox",
  "OCTO*": "OctoBit Coin",
  "OCTO": "OctoCoin",
  "OWC": "Oduwa",
  "OCN": "Odyssey",
  "OFCR": "OfficerCoin",
  "OJX": "Ojooo",
  "OKB": "Okex",
  "OLM": "Olam",
  "ODNT": "Old Dogs New Tricks",
  "OLDSF": "OldSafeCoin",
  "OLV": "OldV",
  "OLE": "Olive",
  "OLYMP": "OlympCoin",
  "MOT": "Olympus Labs",
  "OMA": "OmegaCoin",
  "OMGC": "OmiseGO Classic",
  "OMG": "OmiseGo",
  "OMNI": "Omni",
  "OMC": "OmniCron",
  "ECOM": "Omnitude",
  "ONL": "On.Live",
  "OGT": "One Game",
  "OSF": "One Solution",
  "OLT": "OneLedger",
  "RNT": "OneRoot Network",
  "ONX": "Onix",
  "OIO": "Online",
  "ONT": "Ontology",
  "ONGAS": "Ontology Gas",
  "OPQ": "Opacity",
  "XPO": "Opair",
  "OPAL": "OpalCoin",
  "OPEN": "Open Platform",
  "OTN": "Open Trading Network",
  "OAX": "OpenANX",
  "BRIX": "OpenBrix",
  "CHAT": "OpenChat",
  "OSC": "OpenSourceCoin",
  "ZNT": "OpenZen",
  "OPES": "Opes",
  "OPP": "Opporty",
  "OPEX": "Optherium Token",
  "OSA": "Optimal Shelf Availability Token",
  "OPTION": "OptionCoin",
  "OPU": "Opu Coin",
  "OPT": "Opus",
  "OCT": "OracleChain",
  "OC": "OrangeCoin",
  "ORBS": "Orbis",
  "ORB": "Orbitcoin",
  "RDC": "Ordocoin",
  "ORGT": "Organic Token",
  "ORC": "Organicco",
  "ORI": "Origami",
  "ORS*": "OriginSport",
  "TRAC": "OriginTrail",
  "OCC": "Original Crypto Coin",
  "ORLY": "OrlyCoin",
  "ORME": "Ormeus Coin",
  "ORO": "OroCoin",
  "OROC": "Orocrypt",
  "ORV": "Orvium",
  "OICOIN": "Osmium Investment Coin",
  "OS76": "OsmiumCoin",
  "OWD": "Owlstand",
  "ZXC": "Oxcert",
  "OXY": "Oxycoin",
  "PRL": "Oyster Pearl",
  "OYS": "Oyster Platform",
  "SHL": "Oyster Shell",
  "P2PS": "P2P Solutions Foundation",
  "GENE": "PARKGENE",
  "PAT": "PATRON",
  "PAXEX": "PAXEX",
  "PQT": "PAquarium",
  "PAI": "PCHAIN",
  "PGF7T": "PGF500",
  "PHI": "PHI Token",
  "PITCH": "PITCH",
  "PLNC": "PLNCoin",
  "PCH": "POPCHAIN",
  "PPOVR": "POVR",
  "TOSS": "PROOF OF TOSS",
  "PROUD": "PROUD Money",
  "PROOF": "PROVER",
  "PSI": "PSIcoin",
  "PVP": "PVPChain",
  "PWR": "PWR Coin",
  "PX": "PXcoin",
  "PCS": "Pabyosi Coin",
  "PBC": "PabyosiCoin",
  "PAC": "PacCoin",
  "PAK": "Pakcoin",
  "PLMT": "Pallium",
  "PND": "PandaCoin",
  "PINKX": "PantherCoin",
  "PAN": "Pantos",
  "PRT": "Papusha",
  "PRP": "Papyrus",
  "PRG": "Paragon",
  "DUO": "ParallelCoin",
  "PARA": "ParanoiaCoin",
  "PARETO": "Pareto Network Token",
  "PKB": "ParkByte",
  "PAR": "Parlay",
  "PART": "Particl",
  "PASC": "Pascal Coin",
  "PASL": "Pascal Lite",
  "PAS": "Passive Coin",
  "PTO": "Patentico",
  "PTOY": "Patientory",
  "PAVO": "Pavocoin",
  "PAX": "Paxos Standard",
  "PBLK": "PayBlock",
  "PYC": "PayCoin",
  "XPY": "PayCoin",
  "PFR": "PayFair",
  "PAYP": "PayPeer",
  "PPP": "PayPie",
  "PYP": "PayPro",
  "PYN": "Paycentos",
  "CON_": "Paycon",
  "PGC*": "Paygine",
  "PMNT": "Paymon",
  "PYT": "Payther",
  "PEC": "PeaceCoin",
  "PRLPAY": "PearlPay",
  "XPB": "Pebble Coin",
  "PBL": "Pebbles",
  "PCL": "Peculium",
  "PCO": "Pecunio",
  "PCN": "PeepCoin",
  "PMTN": "Peer Mountain",
  "PPC": "PeerCoin",
  "GUESS": "Peerguess",
  "PPY": "Peerplays",
  "PGC": "Pegascoin",
  "PEN*": "PenCoin",
  "PNT": "Penta",
  "PTA": "PentaCoin",
  "PNY": "Peony Coin",
  "MAN": "People",
  "MEME": "Pepe",
  "PEPECASH": "Pepe Cash",
  "XPR": "Permian",
  "PIE": "Persistent Information Exchange",
  "PERU": "PeruCoin",
  "PTC": "PesetaCoin",
  "PSB": "PesoBit",
  "PETL": "Petlife",
  "PTR": "Petro",
  "XPD": "PetroDollar",
  "PXL": "Phalanx",
  "SOUL*": "Phantasma",
  "PNX": "PhantomX",
  "XPH": "PharmaCoin",
  "PHS": "PhilosophersStone",
  "PXC": "PhoenixCoin",
  "PHM": "Phomeum",
  "PHR*": "Phore",
  "PHTC": "Photochain",
  "PHO": "Photon",
  "PHT": "Photon Token",
  "PHR": "Phreak",
  "PGN": "Pigeoncoin",
  "PIGGY": "Piggy Coin",
  "PKC": "Pikciochain",
  "PLR": "Pillar",
  "PTT": "Pink Taxi Token",
  "PINK": "PinkCoin",
  "PINMO": "Pinmo",
  "PCOIN": "Pioneer Coin",
  "PIO": "Pioneershares",
  "SKULL": "Pirate Blocks",
  "PIRATE": "PirateCash",
  "PIRL": "Pirl",
  "PIZZA": "PizzaCoin",
  "PLAI": "Plair",
  "PLAN": "Plancoin",
  "PLANET": "PlanetCoin",
  "PLNX": "Planumex",
  "XPT": "Plata",
  "PTNX": "Platin",
  "PLC*": "PlatinCoin",
  "PNC": "PlatiniumCoin",
  "XPTX": "PlatinumBAR",
  "LUC": "Play 2 Live",
  "PLA": "PlayChip",
  "PXG": "PlayGame",
  "PKT": "Playkey",
  "DN8": "Pldgr",
  "PLG": "Pledgecamp",
  "PLX": "PlexCoin",
  "PLURA": "PluraCoin",
  "PLC": "PlusCoin",
  "PLUS1": "PlusOneCoin",
  "GPPT": "Pluto Project Coin",
  "PTC**": "Plutocoin",
  "PLU": "Pluton",
  "PLTX": "PlutusX",
  "POE": "Po.et",
  "POS": "PoSToken",
  "POA": "Poa Network",
  "XPS": "PoisonIvyCoin",
  "XPOKE": "PokeChain",
  "POKER": "PokerCoin",
  "XPST": "PokerSports",
  "PAL": "PolicyPal Network",
  "POLIS": "PolisPay",
  "POLY": "PolyBit",
  "NCT": "PolySwarm",
  "PLBT": "Polybius",
  "POLY*": "Polymath Network",
  "PON": "Ponder",
  "PSK": "Pool of Stake",
  "XSP": "PoolStamp",
  "PPS": "PopulStay",
  "POP": "PopularCoin",
  "PPT": "Populous",
  "PEX": "PosEx",
  "PSD": "Poseidon",
  "PCCM": "Poseidon Chain",
  "OCEAN": "Poseidon Foundation",
  "POSQ": "Poseidon Quark",
  "POST": "PostCoin",
  "POT": "PotCoin",
  "POWR": "Power Ledger",
  "PSM": "Prasm",
  "PRE": "Premium",
  "ENTT": "Presale Ventures",
  "PRE*": "Presearch",
  "HILL": "President Clinton",
  "PRES": "President Trump",
  "PBT": "Primalbase",
  "PST": "Primas",
  "PSF": "Prime Shipping Foundation",
  "PXI": "Prime-X1",
  "PRIME": "PrimeChain",
  "XPM": "PrimeCoin",
  "PRX": "Printerium",
  "PRM": "PrismChain",
  "PIVX": "Private Instant Verified Transaction",
  "PRIX": "Privatix",
  "PZM": "Prizm",
  "PRA": "ProChain",
  "XPRO": "ProCoin",
  "PROC": "ProCurrency",
  "PCM": "Procom",
  "PROD*": "Productivist",
  "PHC": "Profit Hunters Coin",
  "PDC": "Project Decorum",
  "JTX": "Project J",
  "PAI*": "Project Pai",
  "OMX": "Project Shivom",
  "PRFT": "Proof Suite Token",
  "PROPS": "Props",
  "PTC*": "Propthereum",
  "PRO": "Propy",
  "VRP": "Prosense.tv",
  "PGL": "Prospectors",
  "PRC": "ProsperCoin",
  "PROTON": "Proton",
  "XES": "Proxeus",
  "XPX": "ProximaX",
  "PSEUD": "PseudoCash",
  "PSY": "Psilocybin",
  "PULSE": "Pulse",
  "PMA": "PumaPay",
  "NPXS": "Pundi X",
  "PUPA": "PupaCoin",
  "PURA": "Pura",
  "PURE": "Pure",
  "VIDZ": "PureVidz",
  "PGT": "Puregold token",
  "PURK": "Purk",
  "PRPL": "Purple Token",
  "PRPS": "Purpose",
  "HLP": "Purpose Coin",
  "PUSHI": "Pushi",
  "PUT": "PutinCoin",
  "PYLNT": "Pylon Network",
  "QLC": "QLC Chain",
  "QTUM": "QTUM",
  "QUSD": "QUSD",
  "QBT*": "Qbao",
  "QOBI": "Qobit",
  "QORA": "QoraCoin",
  "XQR": "Qredit",
  "QBK": "QuBuck Coin",
  "eQUAD": "Quadrant Protocol",
  "QNT": "Quant",
  "QNTU": "Quanta",
  "QUANT": "Quantler",
  "QNTR": "Quantor",
  "QSP": "Quantstamp",
  "QAU": "Quantum",
  "QRL": "Quantum Resistant Ledger",
  "Q1S": "Quantum1Net",
  "QKC": "QuarkChain",
  "QRK": "QuarkCoin",
  "QTZ": "Quartz",
  "QUA": "Quasa",
  "QTL": "Quatloo",
  "QCN": "Quazar Coin",
  "Q2C": "QubitCoin",
  "QBC": "Quebecoin",
  "QCX": "QuickX Protocol",
  "QSLV": "Quicksilver coin",
  "QUIZ": "Quizando",
  "QUN": "QunQun",
  "QASH": "Quoine Liquid",
  "XQN": "Quotient",
  "QVT": "Qvolta",
  "QWARK": "Qwark",
  "QWC": "Qwertycoin",
  "RFL": "RAFL",
  "RAIZER": "RAIZER",
  "KRX": "RAVN Korrax",
  "RAWG": "RAWG",
  "RAC": "RAcoin",
  "RHOC": "RChain",
  "RCN*": "RCoin",
  "REAL": "REAL",
  "REBL": "REBL",
  "MWAT": "RED MegaWatt",
  "RST": "REGA Risk Sharing Token",
  "REME": "REME-Coin",
  "REM": "REMME",
  "RENC": "RENC",
  "RGC": "RG Coin",
  "RIF": "RIF Token",
  "ROI": "ROIcoin",
  "ROS": "ROS Coin",
  "RFT": "RYFTS",
  "RADI": "RadicalCoin",
  "RADS": "Radium",
  "RDN": "RadonPay",
  "RDN*": "Raiden Network",
  "RF": "Raido Financial",
  "RAINC": "RainCheck",
  "RAP": "Rapture",
  "ROC": "Rasputin Online Coin",
  "RTE": "Rate3",
  "XRA": "Ratecoin",
  "RATIO": "Ratio",
  "RAVE": "Ravelous",
  "RVN": "Ravencoin",
  "RAYS": "Rays Network",
  "RZR": "RazorCoin",
  "RWE": "Real-World Evidence",
  "RCT": "RealChain",
  "REA": "Realisto",
  "RCC": "Reality Clash",
  "XRK": "RecordsKeeper",
  "RRT": "Recovery Right Tokens",
  "RRC": "Recycling Regeneration Chain",
  "PHX": "Red Pulse Phoenix",
  "REDC": "RedCab",
  "RCX": "RedCrowCoin",
  "RED": "Redcoin",
  "RDD": "Reddcoin",
  "REDN": "Reden",
  "REE": "ReeCoin",
  "REF": "RefToken",
  "RFR": "Refereum",
  "REC": "Regalcoin",
  "RDS": "Reger Diamond",
  "RLX": "Relex",
  "REL": "Reliance",
  "REMCO": "Remco",
  "RPM": "Render Payment",
  "RNDR": "Render Token",
  "RNS": "RenosCoin",
  "BERRY": "Rentberry",
  "REPO": "Repo Coin",
  "RPB": "Republia",
  "REN": "Republic Token",
  "REPUX": "Repux",
  "REQ": "Request Network",
  "RMS": "Resumeo Shares",
  "RGT": "Retail.Global",
  "RBIT": "ReturnBit",
  "RNC": "ReturnCoin",
  "R": "Revain",
  "REV": "Revenu",
  "RVR": "Revolution VR",
  "XRE": "RevolverCoin",
  "RWD": "Reward Vision",
  "RMOB": "RewardMob",
  "RHEA": "Rhea",
  "XRL": "Rialto.AI",
  "RBR": "Ribbit Rewards",
  "RICE": "RiceCoin",
  "RIDE": "Ride My Car",
  "RIC": "Riecoin",
  "RMESH": "RightMesh",
  "RBT": "Rimbit",
  "RING": "RingCoin",
  "RIPO": "RipOffCoin",
  "RIPAX": "RipaEx",
  "RCN": "Ripio",
  "RIPT": "RiptideCoin",
  "RBX": "RiptoBuX",
  "RISE": "Rise",
  "RVT": "Rivetz",
  "RAC**": "RoBET",
  "ROBET": "RoBet",
  "RBDT": "RoBust Defense Token",
  "PUT*": "Robin8 Profile Utility Token",
  "RAC*": "RoboAdvisorCoin",
  "ROX": "Robotina",
  "RKT": "Rock Token",
  "ROK": "Rockchain",
  "ROCK*": "RocketCoin",
  "RPC": "RonPaulCoin",
  "RSC": "Ronaldinho Soccer Coin",
  "ROOT": "RootCoin",
  "ROOTS": "RootProject",
  "RT2": "RotoCoin",
  "ROUND": "RoundCoin",
  "ROE": "Rover Coin",
  "RKC": "Royal Kingdom Coin",
  "RYC": "RoyalCoin",
  "ROYAL": "RoyalCoin",
  "RYCN": "RoyalCoin 2.0",
  "RBIES": "Rubies",
  "RUBY": "Rubius",
  "RUBIT": "Rublebit",
  "RBY": "RubyCoin",
  "RUFF": "Ruff",
  "RUPX": "Rupaya",
  "RUP": "Rupee",
  "RC": "Russiacoin",
  "RMC": "Russian Mining Coin",
  "RUST": "RustCoin",
  "RUSTBITS": "Rustbits",
  "RYO": "Ryo",
  "S8C": "S88 Coin",
  "SABR": "SABR Coin",
  "SGA": "SAGA",
  "SAR*": "SARCoin",
  "SLY": "SELFLLERY",
  "SGAT": "SGAT",
  "SGP": "SGPay",
  "XSH": "SHIELD",
  "SIDT": "SID Token",
  "SKYFT": "SKYFchain",
  "SMNX": "SMNX",
  "SSX": "SOMESING",
  "SNM": "SONM",
  "SXDT": "SPECTRE Dividend Token",
  "SXUT": "SPECTRE Utility Token",
  "SPICE": "SPiCE Venture Capital",
  "SRCOIN": "SRCoin",
  "SSV": "SSVCoin",
  "STAC": "STAC",
  "STACS": "STACS Token",
  "STRS": "STARS",
  "EURS": "STASIS EURS",
  "STEX": "STEX",
  "STK": "STK Token",
  "STS": "STRESScoin",
  "STRY": "STRYKZ",
  "SUQA": "SUQA",
  "SaTT": "SaTT",
  "HAVEN": "Safe Haven",
  "XSTC": "Safe Trade Coin",
  "SAFE": "SafeCoin",
  "SAFEX": "SafeExchangeCoin",
  "SFR": "SaffronCoin",
  "SAF": "Safinus",
  "SAGA": "SagaCoin",
  "SFU": "Saifu",
  "SKB*": "Sakura Bloom",
  "SKR": "Sakuracoin",
  "SAL": "SalPay",
  "SALT": "Salt Lending",
  "SLS": "SaluS",
  "SMSR": "Samsara Coin",
  "SND": "Sandcoin",
  "SAN": "Santiment",
  "SPN*": "Sapien Network",
  "XAI": "SapienceCoin",
  "XRF": "Sarf",
  "XRN": "Saronite",
  "SAT": "Satisfaction Token",
  "STV": "Sativa Coin",
  "MAD*": "SatoshiMadness",
  "SAT2": "Saturn2Coin",
  "STO": "Save The Ocean",
  "SANDG": "Save and Gain",
  "SWC": "Scanetchain Token",
  "ST": "Scienceroot",
  "SNcoin": "ScientificCoin",
  "SCOOBY": "Scooby coin",
  "SCORE": "Scorecoin",
  "SCOR": "Scorista",
  "SCR*": "Scorum",
  "SCOT": "Scotcoin",
  "SCRIBE": "Scribe Network",
  "SCRL": "Scroll",
  "DDD": "Scry.info",
  "SCRPT": "ScryptCoin",
  "SCT": "ScryptToken",
  "SRT": "Scrypto",
  "SEAL": "Seal Network",
  "SECI": "Seci",
  "SCRT": "SecretCoin",
  "SRC": "SecureCoin",
  "SEC": "SecureCryptoPayments",
  "SRXIO": "Securix",
  "SET": "Securosys",
  "SEEDS": "SeedShares",
  "SEELE": "Seele",
  "B2X": "SegWit2x",
  "SEL": "SelenCoin",
  "STOR": "Self Storage Coin",
  "KEY": "SelfKey",
  "SSC": "SelfSell",
  "SGO": "Selfie GO",
  "SEM": "Semux",
  "SDRN": "Senderon",
  "SNS": "Sense",
  "SENSE": "Sense Token",
  "SEN": "Sentaro",
  "EMOT": "Sentigraph.io",
  "SENT": "Sentinel",
  "SENC": "Sentinel Chain",
  "UPP": "Sentinel Protocol",
  "SNTVT": "Sentivate",
  "SEQ": "Sequence",
  "SERA": "Seraph",
  "SRNT": "Serenity",
  "SRV": "ServAdvisor",
  "SETH": "Sether",
  "SP": "Sex Pistols",
  "SXC": "SexCoin",
  "SHA": "Shacoin",
  "SHADE": "ShadeCoin",
  "SDC": "ShadowCash",
  "SHARD": "ShardCoin",
  "SS": "Sharder",
  "SSS": "ShareChain",
  "eSwitch": "ShareMeAll",
  "SHR": "ShareRing",
  "SAK": "SharkCoin",
  "SHKG": "SharkGate",
  "SHP*": "Sharpe Capital",
  "JEW": "Shekel",
  "SHLD": "ShieldCoin",
  "SHIFT": "Shift",
  "SH": "Shilling",
  "SHE": "Shine Chain",
  "SHIP": "ShipChain",
  "SHPT": "Shipit",
  "SHORTY": "ShortyCoin",
  "SHOW": "ShowCoin",
  "HAND": "ShowHand",
  "SHPING": "Shping Coin",
  "SHREK": "ShrekCoin",
  "SCH": "Sia Cash Coin",
  "SC": "Siacoin",
  "SIB": "SibCoin",
  "SGL": "Sigil",
  "SIG": "Signal",
  "SGN": "Signals Network",
  "SIGT": "Signatum",
  "SNTR": "Silent Notary",
  "SILKT": "SilkChain",
  "SILK": "SilkCoin",
  "OST": "Simple Token",
  "SPLB": "SimpleBank",
  "SIGU": "Singular",
  "SNGLS": "SingularDTV",
  "AGI": "SingularityNET",
  "SRN": "SirinLabs",
  "SKC": "Skeincoin",
  "SKI": "Skillchain",
  "SKIN": "Skincoin",
  "SKRP": "Skraps",
  "SKR*": "Skrilla Token",
  "SKM": "Skrumble Network",
  "SKB": "SkullBuzz",
  "SKYM": "SkyMap",
  "SKY": "Skycoin",
  "SLX": "Slate",
  "SLM": "SlimCoin",
  "SLING": "Sling Coin",
  "RBTC": "Smart Bitcoin",
  "SIFT": "Smart Investment Fund Token",
  "POD": "Smart League",
  "TASH": "Smart Trip Platform",
  "VALOR": "Smart Valor",
  "SMART*": "SmartBillions",
  "SMART": "SmartCash",
  "SMC": "SmartCoin",
  "SLST": "SmartLands",
  "SMT*": "SmartMesh",
  "SMLY": "SmileyCoin",
  "SMILO": "Smilo",
  "SMOKE": "Smoke",
  "SMF": "SmurfCoin",
  "SNPC": "SnapCoin",
  "SNIP": "SnipCoin",
  "SNOV": "Snovio",
  "XSG": "Snowgem",
  "ONG": "SoMee.Social",
  "SOAR": "Soarcoin",
  "SLT": "Social Lending Network",
  "SMAC": "Social Media Coin",
  "SMT": "Social Media Market",
  "SEND": "Social Send",
  "SOCC": "SocialCoin",
  "SG": "SocialGood",
  "SREUR": "SocialRemit",
  "XBOT": "SocialXbotCoin",
  "SCL": "Sociall",
  "SOIL": "SoilCoin",
  "SOJ": "Sojourn Coin",
  "SOL": "Sola",
  "SDAO": "Solar DAO",
  "SLR": "SolarCoin",
  "CELL": "SolarFarm",
  "SRX": "Solarex",
  "SFC": "Solarflarecoin",
  "XLR": "Solaris",
  "SOLE": "SoleCoin",
  "SOLID": "Solidified",
  "SCT*": "Soma",
  "SONG": "Song Coin",
  "SSD": "Sonic Screw Driver Coin",
  "SOON": "SoonCoin",
  "SPHTX": "SophiaTX",
  "SNK": "Sosnovkino",
  "SOUL": "SoulCoin",
  "SPX": "Sp8de",
  "SCASH": "SpaceCash",
  "SPC*": "SpaceChain",
  "SPACE": "SpaceCoin",
  "SPA": "SpainCoin",
  "SPANK": "SpankChain",
  "SPK": "SparksPay",
  "SPEC": "SpecCoin",
  "SPX*": "Specie",
  "XSPEC": "Spectre",
  "SPEND": "Spend",
  "SPHR": "Sphere Coin",
  "XID": "Sphre AIR",
  "SPIKE": "Spiking",
  "SPC": "SpinCoin",
  "SPD*": "Spindle",
  "SPKZ": "Spokkz",
  "SPORT": "SportsCoin",
  "SFT": "SportsFix",
  "SPF": "SportyCo",
  "SPOT": "Spotcoin",
  "SPT": "Spots",
  "SPOTS": "Spots",
  "SPR": "Spreadcoin",
  "SPRTZ": "SpritzCoin",
  "SPRTS": "Sprouts",
  "SQP": "SqPay",
  "SQL": "Squall Coin",
  "SQR": "Squeezer",
  "XSI": "Stability Shares",
  "SBC": "StableCoin",
  "USDS": "StableUSD",
  "DSLA": "Stacktical",
  "STCN": "Stakecoin",
  "XSN": "Stakenet",
  "STA*": "Stakers",
  "STHR": "Stakerush",
  "LABX": "Stakinglab",
  "STALIN": "StalinCoin",
  "STC": "StarChain",
  "STR*": "StarCoin",
  "STAR*": "StarCoin",
  "SRC*": "StarCredits",
  "KST": "StarKST",
  "STT": "Staramba",
  "STAR": "Starbase",
  "START": "StartCoin",
  "STA": "Starta",
  "STP": "StashPay",
  "SQOIN": "StasyQ",
  "SNT": "Status Network Token",
  "STAX": "Staxcoin",
  "XST": "StealthCoin",
  "PNK": "SteamPunk",
  "STEEM": "Steem",
  "SBD*": "Steem Backed Dollars",
  "XLM": "Stellar",
  "XTL": "Stellite",
  "SCIA": "Stem Cell",
  "STN": "Steneum Coin",
  "STEPS": "Steps",
  "SLG": "SterlingCoin",
  "SPD": "Stipend",
  "STIPS": "Stips",
  "STOCKBET": "StockBet",
  "SCC": "StockChain Coin",
  "STQ": "Storiqa Token",
  "STORJ": "Storj",
  "SJCX": "StorjCoin",
  "STORM": "Storm",
  "STX": "Stox",
  "STAK": "Straks",
  "SISA": "Strategic Investments in Significant Areas",
  "STRAT": "Stratis",
  "SSH": "StreamSpace",
  "STM": "Streamity",
  "DATA": "Streamr DATAcoin",
  "SHND": "StrongHands",
  "SUT": "Suapp",
  "SUB*": "Subscriptio",
  "SUB": "Substratum Network",
  "SUCR": "Sucre",
  "SGC": "Sudan Gold Coin",
  "SGR": "Sugar Exchange",
  "SUMO": "Sumokoin",
  "SNC": "SunContract",
  "SSTC": "SunShotCoin",
  "SUP": "Supcoin",
  "SBTC": "Super Bitcoin",
  "SUPER": "SuperCoin",
  "UNITY": "SuperNET",
  "SEED": "Superbloom",
  "M1": "SupplyShock",
  "SPM": "Supreme",
  "RMT": "SureRemit",
  "SUR": "Suretly",
  "SWA": "Swace",
  "SWACH": "Swachhcoin",
  "BUCKS": "SwagBucks",
  "SWT": "Swarm City Token",
  "SWM": "Swarm Fund",
  "SWARM": "SwarmCoin",
  "SWEET": "SweetStake",
  "SWFTC": "SwftCoin",
  "SWING": "SwingCoin",
  "SCN": "Swiscoin",
  "CHSB": "SwissBorg",
  "SRC**": "SwissRealCoin",
  "SIC": "Swisscoin",
  "SWTH": "Switcheo",
  "SDP": "SydPakCoin",
  "SYLO": "Sylo",
  "SYNC": "SyncCoin",
  "MFG": "SyncFab",
  "SYC": "SynchroCoin",
  "SYNCO": "Synco",
  "SYNX": "Syndicate",
  "AMP": "Synereo",
  "SNRG": "Synergy",
  "SNX": "Synthetix",
  "SYS": "SysCoin",
  "TBT": "T-BOT",
  "TCX": "T-Coin",
  "TZO": "TANZO",
  "BAR": "TBIS token",
  "TDFB": "TDFB",
  "TFD": "TE-FOOD",
  "TKY": "THEKEY Token",
  "TTN": "TITA Project",
  "TXM": "TMONEY",
  "TOA": "TOA Coin",
  "TPC": "TPCash",
  "TRX": "TRON",
  "XTROPTIONS": "TROPTIONS",
  "TTV": "TV-TWO",
  "TWISTR": "TWIST",
  "TTU": "TaTaTu",
  "TCHN": "Tachain",
  "TAG": "TagCoin",
  "TAJ": "TajCoin",
  "TAK": "TakCoin",
  "TKLN": "Taklimakan",
  "TALAO": "Talao",
  "TLNT": "Talent Token",
  "TCOIN": "Talenthon",
  "TAL": "Talentico",
  "TAM": "TamaGucci",
  "XTO": "Tao",
  "TTT": "Tap Project",
  "TAP": "TappingCoin",
  "TGT": "TargetCoin",
  "TAT": "Tatiana Coin",
  "TSE": "TattooCoin",
  "TEC": "TeCoin",
  "TCHB": "Teachers Blockchain",
  "TEAM": "TeamUP",
  "TECH": "TechCoin",
  "THS": "TechShares",
  "TEK": "TekCoin",
  "TEL": "Telcoin",
  "GRAM": "Telegram Open Network",
  "TELL": "Tellurion",
  "PAY": "TenX",
  "TENNET": "Tennet",
  "TENZ": "Tenzorum",
  "LED": "Terawatt",
  "TERN": "Ternio",
  "TRN": "Ternion",
  "TVA": "Terra Virtua",
  "TRC": "TerraCoin",
  "TECO": "TerraEcoCoin",
  "TGN": "TerraGreen",
  "TER": "TerraNovaCoin",
  "TESLA": "TeslaCoilCoin",
  "TES": "TeslaCoin",
  "USDT": "Tether",
  "TRA": "Tetra",
  "XTZ": "Tezos",
  "THNX": "ThankYou",
  "0xDIARY": "The 0xDiary Token",
  "ABYSS": "The Abyss",
  "EFX": "The EFFECT Network",
  "TFC": "The Freedom Coin",
  "GOVT": "The Government Network",
  "THC": "The Hempcoin",
  "SUNEX": "The Sun Exchange",
  "XVE": "The Vegan Initiative",
  "CHIEF": "TheChiefCoin",
  "GCC*": "TheGCCcoin",
  "VIG": "TheVig",
  "TCR": "Thecreed",
  "MAY": "Theresa May Coin",
  "THETA": "Theta",
  "TAGR": "Think And Get Rich Coin",
  "THRT": "ThriveToken",
  "TSC": "ThunderStake",
  "TIA": "Tianhe",
  "TBRS": "Tiberius",
  "TDX": "Tidex Token",
  "TNT": "Tierion",
  "TIE": "Ties Network",
  "TCH": "TigerCash",
  "TGC": "TigerCoin",
  "TIG": "Tigereum",
  "XTC": "TileCoin",
  "BILL": "TillBilly",
  "TIME": "Time",
  "TNB": "Time New Bank",
  "TME": "Timereum",
  "TMC": "TimesCoin",
  "TIMI": "Timicoin",
  "TIO*": "Tio Tour Guides",
  "TIP": "Tip Blockchain",
  "TTC": "TitCoin",
  "TITAN": "Titan",
  "TBAR": "Titanium BAR",
  "TIT": "TittieCoin",
  "TMT*": "ToTheMoon",
  "TODAY": "TodayCoin",
  "TKD": "Tokedo",
  "TAAS": "Token as a Service",
  "TKN": "TokenCard",
  "TCT": "TokenClub",
  "TDS": "TokenDesk",
  "TPAY*": "TokenPay",
  "ACE": "TokenStars",
  "TEAMT": "TokenStars TEAM Token",
  "AIRE": "Tokenaire",
  "TBX": "Tokenbox",
  "TEN": "Tokenomy",
  "TGTC": "Tokensgate",
  "TKS": "Tokes",
  "TKA": "Tokia",
  "TOK": "TokugawaCoin",
  "TOKC": "Tokyo Coin",
  "TOM": "Tomahawkcoin",
  "TBL": "Tombola",
  "TOMO": "TomoChain",
  "TOPC": "Topchain",
  "TOR": "TorCoin",
  "TOT": "TotCoin",
  "TRET": "Tourist Review",
  "BBC": "TraDove B2BCoin",
  "MTN": "TrackNetToken",
  "TRCT": "Tracto",
  "TXP": "Trade Pharma Network",
  "TIOX": "Trade Token X",
  "TIO": "Trade.io",
  "EXTP": "TradePlace",
  "TDZ": "Tradelize",
  "TRAID": "Traid",
  "TRAK": "TrakInvest",
  "TX": "Transfer",
  "TBCX": "TrashBurn",
  "AVALA": "Travala",
  "TRV": "Travel Coin",
  "TT": "TravelChain",
  "TLT": "Travelertoken",
  "TRF": "Travelflex",
  "TRAVEL": "Travelvee",
  "TMT**": "Traxia Membership Token",
  "TOT*": "Trecento Blockchain Capital",
  "TREX": "TreeBlock",
  "TZC": "TrezarCoin",
  "FORCE": "TriForce Tokens",
  "TRIA": "Triaconta",
  "TRI": "Triangles Coin",
  "TRIBE": "TribeToken",
  "TRICK": "TrickyCoin",
  "TRDT": "Trident",
  "GPS": "Triffic",
  "ID": "TrigID",
  "TRIG": "Trigger",
  "TIIM": "TriipMiles",
  "TNC": "Trinity Network Credit",
  "TRIO": "Tripio",
  "TRIP": "Trippki",
  "TRVC": "Trivecoin",
  "TRVR": "Trivver",
  "TRW": "Triwer",
  "TPG": "Troll Payment",
  "TKN*": "TrollTokens",
  "TROLL": "Trollcoin",
  "TRK": "TruckCoin",
  "TRCK": "Truckcoin",
  "TRUE": "True Chain",
  "TFL": "True Flip Lottery",
  "TUSD": "True USD",
  "TDP": "TrueDeck",
  "TGAME": "TrueGame",
  "TIC": "TrueInvestmentCoin",
  "TRUMP": "TrumpCoin",
  "TRST": "TrustCoin",
  "TRUST": "TrustPlus",
  "TTB": "TrustaBit",
  "FLEX": "TrustedCars FLEX",
  "WHO": "Truwho",
  "TYM": "Tryvium",
  "TLP": "TulipCoin",
  "TUR": "Turron",
  "TRTL": "TurtleCoin",
  "TUT": "Tutellus",
  "TRT": "TuurnT",
  "TWLV": "Twelve Coin",
  "TWC": "Twilight",
  "TWIST": "TwisterCoin",
  "UUU": "U Network",
  "UCASH": "U.CASH",
  "UCN": "UC Coin",
  "UCOINT": "UCOIN",
  "UCT": "UCOT",
  "UFO": "UFO Coin",
  "HVE": "UHIVE",
  "UMK": "UMKA",
  "UNX": "UNEOX",
  "XUP": "UPcoin",
  "UR": "UR",
  "URX": "URANIUMX",
  "USAT": "USAT",
  "USCOIN": "USCoin",
  "USDC": "USD Coin",
  "USDCT": "USDCT",
  "USOAMIC": "USOAMIC",
  "UBC": "Ubcoin",
  "UBEX": "Ubex",
  "UBQ": "Ubiq",
  "UBIQ": "Ubiqoin",
  "U": "Ucoin",
  "USC": "Ultimate Secure Cash",
  "UTC": "UltraCoin",
  "XUN": "UltraNote",
  "ULTC": "Umbrella",
  "UMC": "Umbrella Coin",
  "UNC": "UnCoin",
  "UNAT": "Unattanium",
  "NBOX": "Unboxed",
  "UNB": "UnbreakableCoin",
  "UNF": "Unfed Coin",
  "UBT": "UniBright",
  "CANDY": "UnicornGo Candy",
  "USX": "Unified Society USDEX",
  "UNIFY": "Unify",
  "UKG": "UnikoinGold",
  "UNIQ": "Uniqredit",
  "USDE": "UnitaryStatus Dollar",
  "UAEC": "United Arab Emirates Coin",
  "UEC": "United Emirates Coin",
  "UTT": "United Traders Token",
  "UBTC": "UnitedBitcoin",
  "GOALS": "UnitedFans",
  "UIS": "Unitus",
  "UTNP": "Universa",
  "UNIT": "Universal Currency",
  "UMO": "Universal Molecule",
  "URT": "Universal Recognition Token",
  "URP": "Universal Reward Protocol",
  "UNRC": "UniversalRoyalCoin",
  "UNI": "Universe",
  "UNO": "Unobtanium",
  "UP": "UpToken",
  "UFR": "Upfiring",
  "UQC": "Uquid Coin",
  "URALS": "Urals Coin",
  "URB": "Urbit Data",
  "URO": "UroCoin",
  "USE": "Usechain Token",
  "UETL": "Useless Eth Token Lite",
  "UET": "Useless Ethereum Token",
  "UTH": "Uther",
  "UTL": "Utile Network",
  "UTIL": "Utility Coin",
  "OOT": "Utrum",
  "UTK": "Utrust",
  "UWC": "Uwezocoin",
  "VIDT": "V-ID",
  "VANIG": "VANIG",
  "VANM": "VANM",
  "VAR": "VARcrypt",
  "VEGA": "VEGA",
  "VNTY": "VENOTY",
  "VRX Token": "VIARIUM",
  "VIBE": "VIBEHub",
  "VIP": "VIP Tokens",
  "VITE": "VITE",
  "VIVO": "VIVO Coin",
  "VLUX": "VLUX",
  "VTOS": "VTOS",
  "VTUUR": "VTUUR",
  "VTRD": "VTradeExchange",
  "VVI": "VV Coin",
  "VLD": "Valid",
  "VALID": "Validator Token",
  "VAL": "Valorbit",
  "VLR": "Valorem",
  "VANY": "Vanywhere",
  "VPRC": "VapersCoin",
  "VAPOR": "Vaporcoin",
  "VAD": "Varanida",
  "VLTC": "VaultCoin",
  "XVC": "Vcash",
  "VTHO": "VeChainThor",
  "VC": "Vecap",
  "VET": "Vechain",
  "VEC2": "VectorCoin 2.0",
  "VLX": "Velox",
  "VLT": "Veltor",
  "VENA": "Vena Network",
  "VNS": "Venus",
  "VENUS": "VenusEnergy",
  "VRA": "Verasity",
  "VNT": "Veredictum",
  "XVG": "Verge",
  "VRC": "VeriCoin",
  "VME": "VeriME",
  "VRF": "Verifier",
  "SPY": "Verifier",
  "CRED": "Verify",
  "VERI": "Veritaseum",
  "VRTY": "Verity",
  "VRM": "Verium",
  "VRN": "Vernam",
  "VRS": "Veros",
  "VERSA": "Versa Token",
  "VTC": "Vertcoin",
  "VTX": "Vertex",
  "VTEX": "Vertex",
  "VTL": "Vertical",
  "VEST": "VestChain",
  "VST": "Vestarin",
  "VEX": "Vexanium",
  "VZT": "Vezt",
  "VIA": "ViaCoin",
  "VIAZ": "Viaz",
  "VIB": "Viberate",
  "VIT": "Vice Industry Token",
  "VTM": "Victorieum",
  "VTY": "Victoriouscoin",
  "VIC": "Victorium",
  "VID": "VideoCoin",
  "VDO": "VidioCoin",
  "VIDI": "Vidion",
  "VIDY": "Vidy",
  "VIEW": "Viewly",
  "VEOT": "Viewo",
  "VIN": "VinChain",
  "VIOR": "ViorCoin",
  "IDORU": "Vip2Fan",
  "VIRAL": "Viral Coin",
  "VUC": "Virta Unique Coin",
  "VTA": "VirtaCoin",
  "XVP": "VirtacoinPlus",
  "VRT": "Virtual Reality Technology",
  "VRH": "Virtual Rehab",
  "VMC": "VirtualMining Coin",
  "VISIO": "Visio",
  "VNX": "VisionX",
  "VITAE": "Vitae",
  "VIU": "Viuly",
  "OGO": "VogoV",
  "VOISE": "Voise",
  "VOL": "VolAir",
  "VLTX": "Volentix",
  "VLP": "Volpo",
  "VTN": "Voltroon",
  "VOOT": "VootCoin",
  "VOT": "Votecoin",
  "VOYA": "Voyacoin",
  "VSX": "Vsync",
  "VTR": "Vtorrent",
  "VULC": "Vulcano",
  "W12": "W12 Protocol",
  "W3C": "W3Coin",
  "WAB": "WABnetwork",
  "WIN": "WCoin",
  "WETH": "WETH",
  "WRL": "WHIRL",
  "WMC": "WMCoin",
  "WOM": "WOM",
  "WOWX": "WOWX",
  "WRT": "WRTcoin",
  "WTXH": "WTX HUB",
  "WU": "WULET",
  "WABI": "WaBi",
  "WGR": "Wagerr",
  "WTC": "Waltonchain",
  "WAN": "Wanchain",
  "WAND": "WandX",
  "WRC*": "WarCoin",
  "WARP": "WarpCoin",
  "WASH": "WashingtonCoin",
  "WUG": "WatchUGot",
  "WMB": "WatermelonBlock",
  "WAVES": "Waves",
  "WCT": "Waves Community Token",
  "WGO": "WavesGO",
  "WNET": "Wavesnode.net",
  "WAY": "WayCoin",
  "WSX": "WeAreSatoshi",
  "WBY": "WeBuy",
  "WPR": "WePower",
  "WT": "WeToken",
  "WEALTH": "WealthCoin",
  "WVR": "Weave",
  "WEB*": "Webchain",
  "WEB": "Webcoin",
  "WDX": "WeiDex",
  "WELL": "Well",
  "WLME": "Wellmee",
  "WTL": "Welltrado",
  "WMK": "Wemark",
  "WEX": "Wexcoin",
  "WHL": "WhaleCoin",
  "AWT": "WhatsOnPic",
  "WHEN": "WhenHub",
  "WC": "WhiteCoin",
  "XWC": "WhiteCoin",
  "WIC": "Wi Coin",
  "WIIX": "Wiix",
  "WBB": "Wild Beast Coin",
  "WILD": "Wild Crypto",
  "WINS": "WinStars",
  "WHN": "Windhan Energy",
  "LIF": "Winding Tree",
  "WINE": "WineCoin",
  "WINGS": "Wings DAO",
  "WINK": "Wink",
  "WISC": "WisdomCoin",
  "WSC": "WiserCoin",
  "WSH": "Wish Finance",
  "WISH*": "WishFinance",
  "WIT": "Witcoin",
  "WLK": "Wolk",
  "WOMEN": "WomenCoin",
  "LOG": "Wood Coin",
  "WBBC": "World Bit Bank",
  "WCG": "World Crypto Gold",
  "WGC": "World Gold Coin",
  "XWT": "World Trade Funds",
  "WOBTC": "WorldBTC",
  "WDC": "WorldCoin",
  "WOP": "WorldPay",
  "WRC": "Worldcore",
  "WPT": "Worldopoly",
  "WAX": "Worldwide Asset eXchange",
  "WBTC": "Wrapped Bitcoin",
  "WYR": "Wyrify",
  "WYS": "Wysker",
  "XRED": "X Real Estate Development",
  "XCASH": "X-CASH",
  "XC": "X11 Coin",
  "X2": "X2Coin",
  "X8X": "X8Currency",
  "CHI": "XAYA",
  "XCZ": "XCOYNZ",
  "XCO": "XCoin",
  "XDE2": "XDE II",
  "XDNA": "XDNA",
  "XELS": "XELS Coin",
  "XTN": "XEND token",
  "XG": "XG Sports",
  "XMX": "XMax",
  "XOV": "XOVBank",
  "XRP": "XRP",
  "XBY": "XTRABYTES",
  "XUEZ": "XUEZ",
  "XXX": "XXXCoin",
  "XYO": "XY Oracle",
  "XNX": "XanaxCoin",
  "XAU": "XauCoin",
  "XAUR": "Xaurum",
  "XCSH": "Xcash",
  "XCEL": "XcelTrip",
  "XCG": "Xchange",
  "XNC": "XenCoin",
  "XEN": "XenixCoin",
  "XNN": "Xenon",
  "XNB": "Xeonbit",
  "MI": "XiaoMiCoin",
  "XDCE": "XinFin Coin",
  "XIOS": "Xios",
  "XT3": "Xt3ch",
  "XRBT": "Xtribe",
  "YAY": "YAYcoin",
  "YAC": "YAcCoin",
  "YACHTCO": "Yachtco",
  "YMC": "YamahaCoin",
  "YMZ": "Yamzu",
  "YBC": "YbCoin",
  "YDY": "Ydentity",
  "YEE": "Yee",
  "YBT": "YellowBetter",
  "YES": "YesCoin",
  "YOC": "YoCoin",
  "YOVI": "YobitVirtualCoin",
  "YON": "YondoCoin",
  "YSH": "Yoshi",
  "U42": "You42",
  "YOYOW": "Yoyow",
  "YUM": "Yumerium",
  "Z2": "Z2 Coin",
  "ZAB": "ZABERcoin",
  "ZAZA": "ZAZA",
  "ZT": "ZB Global",
  "ZCC": "ZCC Coin",
  "ZEC": "ZCash",
  "ZECD": "ZCashDarkCoin",
  "ZCG": "ZCashGOLD",
  "ZCL": "ZClassic",
  "XZC": "ZCoin",
  "ZEN": "ZEN",
  "ZEPH": "ZEPHYR",
  "ZINC": "ZINC",
  "ZIX": "ZIX Token",
  "ZLQ": "ZLiteQubit",
  "ZMN": "ZMINE",
  "ZNAQ": "ZNAQ",
  "ZPR": "ZPER",
  "ZSE": "ZSEcoin",
  "ZEX": "Zaddex",
  "ZAP": "Zap",
  "ZAT": "ZatGo",
  "ZYD": "ZayedCoin",
  "ZXT": "Zcrypt",
  "NZL": "Zealium",
  "ZCO": "Zebi Coin",
  "ZED": "ZedCoins",
  "ZPT": "Zeepin",
  "ZEEW": "Zeew",
  "ZEIT": "ZeitCoin",
  "ZEL": "Zelcash",
  "ZP": "Zen Protocol",
  "ZND": "Zenad",
  "ZENI": "Zennies",
  "ZNA": "Zenome",
  "ZER": "Zero",
  "ZCC1": "ZeroCarbon",
  "ZSC*": "ZeroState",
  "ZEST": "ZestCoin",
  "ZET2": "Zeta2Coin",
  "ZET": "ZetaCoin",
  "ZSC": "Zeusshield",
  "ZUC": "Zeux",
  "ZCN*": "Zichain",
  "ZBC": "Zilbercoin",
  "ZLA": "Zilla",
  "ZIL": "Zilliqa",
  "ZIP": "Zipper",
  "ZIPT": "Zippie",
  "ZOI": "Zoin",
  "ZNE": "ZoneCoin",
  "ZOOM": "ZoomCoin",
  "ZRC": "ZrCoin",
  "ZUP": "Zupply Token",
  "ZUR": "Zurcoin",
  "ZUUM": "Zuum",
  "AQU": "aQuest",
  "AXPR": "aXpire",
  "ELF": "aelf",
  "AXC": "autoXchange",
  "BPN": "beepnow",
  "OX": "betbox",
  "BITCNY": "bitCNY",
  "BITGOLD": "bitGold",
  "BITSILVER": "bitSilver",
  "BITUSD": "bitUSD",
  "CSQ": "cosquare",
  "DCS": "deCLOUDs",
  "DNT": "district0x",
  "ECHT": "e-Chat",
  "EBIT": "eBit",
  "EBTC": "eBitcoin",
  "EBST": "eBoost",
  "ELTC2": "eLTC",
  "LYQD": "eLYQD",
  "DEM": "eMark",
  "EMU": "eMusic",
  "ePRX": "eProxy",
  "EREAL": "eREAL",
  "EMPR": "empowr",
  "BLACK": "eosBLACK",
  "EOSDAC": "eosDAC",
  "XEP": "ephelants360",
  "FDX": "fidentiaX",
  "GCN": "gCn Coin",
  "FFUEL": "getFIFO",
  "HBE": "healthbank",
  "ICHN": "i-chain",
  "IBANK": "iBankCoin",
  "DEAL": "iDealCash",
  "ICE": "iDice",
  "IETH": "iEthereum",
  "RLC": "iEx.ec",
  "ILT": "iOlite",
  "ITU": "iTrue",
  "IW": "iWallet",
  "IXT": "iXledger",
  "IMU": "imusify",
  "ITM": "intimate.io",
  "MCN": "mCoin",
  "MVU": "meVu",
  "MIBO": "miBoodle",
  "MOOLYA": "moolyacoin",
  "NOS": "nOS",
  "redBUX": "redBUX",
  "SUSD": "sUSD",
  "SVD": "savedroid",
  "SBA": "simplyBrand",
  "UFT": "ufoodo",
  "UGC": "ugChain",
  "VSL": "vSlice",
  "VTAG": "veriTAG Token",
  "WBTC*": "wBTC",
  "OPET": "ÕpetFoundation",
  "AED": "United Arab Emirates Dirham",
  "AFN": "Afghan Afghani",
  "ALL": "Albanian Lek",
  "AMD": "Armenian Dram",
  "ANG": "Netherlands Antillean Guilder",
  "AOA": "Angolan Kwanza",
  "ARS": "Argentine Peso",
  "AUD": "Australian Dollar",
  "AWG": "Aruban Florin",
  "AZN": "Azerbaijani Manat",
  "BAM": "Bosnia-Herzegovina Convertible Mark",
  "BBD": "Barbadian Dollar",
  "BDT": "Bangladeshi Taka",
  "BGN": "Bulgarian Lev",
  "BHD": "Bahraini Dinar",
  "BIF": "Burundian Franc",
  "BMD": "Bermudan Dollar",
  "BND": "Brunei Dollar",
  "BOB": "Bolivian Boliviano",
  "BRL": "Brazilian Real",
  "BSD": "Bahamian Dollar",
  "BTC": "Bitcoin",
  "BTN": "Bhutanese Ngultrum",
  "BTS": "BitShares",
  "BWP": "Botswanan Pula",
  "BYN": "Belarusian Ruble",
  "BZD": "Belize Dollar",
  "CAD": "Canadian Dollar",
  "CDF": "Congolese Franc",
  "CHF": "Swiss Franc",
  "CLF": "Chilean Unit of Account (UF)",
  "CLP": "Chilean Peso",
  "CNH": "Chinese Yuan (Offshore)",
  "CNY": "Chinese Yuan",
  "COP": "Colombian Peso",
  "CRC": "Costa Rican Colón",
  "CUC": "Cuban Convertible Peso",
  "CUP": "Cuban Peso",
  "CVE": "Cape Verdean Escudo",
  "CZK": "Czech Republic Koruna",
  "DASH": "Dash",
  "DJF": "Djiboutian Franc",
  "DKK": "Danish Krone",
  "DOGE": "DogeCoin",
  "DOP": "Dominican Peso",
  "DZD": "Algerian Dinar",
  "EAC": "EarthCoin",
  "EGP": "Egyptian Pound",
  "EMC": "Emercoin",
  "ERN": "Eritrean Nakfa",
  "ETB": "Ethiopian Birr",
  "ETH": "Ethereum",
  "EUR": "Euro",
  "FCT": "Factom",
  "FJD": "Fijian Dollar",
  "FKP": "Falkland Islands Pound",
  "FTC": "Feathercoin",
  "GBP": "British Pound Sterling",
  "GEL": "Georgian Lari",
  "GGP": "Guernsey Pound",
  "GHS": "Ghanaian Cedi",
  "GIP": "Gibraltar Pound",
  "GMD": "Gambian Dalasi",
  "GNF": "Guinean Franc",
  "GTQ": "Guatemalan Quetzal",
  "GYD": "Guyanaese Dollar",
  "HKD": "Hong Kong Dollar",
  "HNL": "Honduran Lempira",
  "HRK": "Croatian Kuna",
  "HTG": "Haitian Gourde",
  "HUF": "Hungarian Forint",
  "IDR": "Indonesian Rupiah",
  "ILS": "Israeli New Sheqel",
  "IMP": "Manx pound",
  "INR": "Indian Rupee",
  "IQD": "Iraqi Dinar",
  "IRR": "Iranian Rial",
  "ISK": "Icelandic Króna",
  "JEP": "Jersey Pound",
  "JMD": "Jamaican Dollar",
  "JOD": "Jordanian Dinar",
  "JPY": "Japanese Yen",
  "KES": "Kenyan Shilling",
  "KGS": "Kyrgystani Som",
  "KHR": "Cambodian Riel",
  "KMF": "Comorian Franc",
  "KPW": "North Korean Won",
  "KRW": "South Korean Won",
  "KWD": "Kuwaiti Dinar",
  "KYD": "Cayman Islands Dollar",
  "KZT": "Kazakhstani Tenge",
  "LAK": "Laotian Kip",
  "LBP": "Lebanese Pound",
  "LD": "Linden Dollar",
  "LKR": "Sri Lankan Rupee",
  "LRD": "Liberian Dollar",
  "LSL": "Lesotho Loti",
  "LTC": "LiteCoin",
  "LYD": "Libyan Dinar",
  "MAD": "Moroccan Dirham",
  "MDL": "Moldovan Leu",
  "MGA": "Malagasy Ariary",
  "MKD": "Macedonian Denar",
  "MMK": "Myanma Kyat",
  "MNT": "Mongolian Tugrik",
  "MOP": "Macanese Pataca",
  "MRU": "Mauritanian Ouguiya",
  "MUR": "Mauritian Rupee",
  "MVR": "Maldivian Rufiyaa",
  "MWK": "Malawian Kwacha",
  "MXN": "Mexican Peso",
  "MYR": "Malaysian Ringgit",
  "MZN": "Mozambican Metical",
  "NAD": "Namibian Dollar",
  "NGN": "Nigerian Naira",
  "NIO": "Nicaraguan Córdoba",
  "NMC": "Namecoin",
  "NOK": "Norwegian Krone",
  "NPR": "Nepalese Rupee",
  "NVC": "NovaCoin",
  "NXT": "Nxt",
  "NZD": "New Zealand Dollar",
  "OMR": "Omani Rial",
  "PAB": "Panamanian Balboa",
  "PEN": "Peruvian Nuevo Sol",
  "PGK": "Papua New Guinean Kina",
  "PHP": "Philippine Peso",
  "PKR": "Pakistani Rupee",
  "PLN": "Polish Zloty",
  "PPC": "Peercoin",
  "PYG": "Paraguayan Guarani",
  "QAR": "Qatari Rial",
  "RON": "Romanian Leu",
  "RSD": "Serbian Dinar",
  "RUB": "Russian Ruble",
  "RWF": "Rwandan Franc",
  "SAR": "Saudi Riyal",
  "SBD": "Solomon Islands Dollar",
  "SCR": "Seychellois Rupee",
  "SDG": "Sudanese Pound",
  "SEK": "Swedish Krona",
  "SGD": "Singapore Dollar",
  "SHP": "Saint Helena Pound",
  "SLL": "Sierra Leonean Leone",
  "SOS": "Somali Shilling",
  "SRD": "Surinamese Dollar",
  "SSP": "South Sudanese Pound",
  "STD": "São Tomé and Príncipe Dobra (pre-2018)",
  "STN": "São Tomé and Príncipe Dobra",
  "STR": "Stellar",
  "SVC": "Salvadoran Colón",
  "SYP": "Syrian Pound",
  "SZL": "Swazi Lilangeni",
  "THB": "Thai Baht",
  "TJS": "Tajikistani Somoni",
  "TMT": "Turkmenistani Manat",
  "TND": "Tunisian Dinar",
  "TOP": "Tongan Pa'anga",
  "TRY": "Turkish Lira",
  "TTD": "Trinidad and Tobago Dollar",
  "TWD": "New Taiwan Dollar",
  "TZS": "Tanzanian Shilling",
  "UAH": "Ukrainian Hryvnia",
  "UGX": "Ugandan Shilling",
  "USD": "United States Dollar",
  "UYU": "Uruguayan Peso",
  "UZS": "Uzbekistan Som",
  "VEF": "Venezuelan Bolívar Fuerte (Old)",
  "VEF_BLKMKT": "Venezuelan Bolívar (Black Market)",
  "VEF_DICOM": "Venezuelan Bolívar (DICOM)",
  "VEF_DIPRO": "Venezuelan Bolívar (DIPRO)",
  "VES": "Venezuelan Bolívar Soberano",
  "VND": "Vietnamese Dong",
  "VTC": "VertCoin",
  "VUV": "Vanuatu Vatu",
  "WST": "Samoan Tala",
  "XAF": "CFA Franc BEAC",
  "XAG": "Silver Ounce",
  "XAU": "Gold Ounce",
  "XCD": "East Caribbean Dollar",
  "XDR": "Special Drawing Rights",
  "XMR": "Monero",
  "XOF": "CFA Franc BCEAO",
  "XPD": "Palladium Ounce",
  "XPF": "CFP Franc",
  "XPM": "Primecoin",
  "XPT": "Platinum Ounce",
  "XRP": "Ripple",
  "YER": "Yemeni Rial",
  "ZAR": "South African Rand",
  "ZMW": "Zambian Kwacha",
  "ZWL": "Zimbabwean Dollar"
};

	//save password variable. With this key, Scriptbill saves the password that decrypts a note
	//in the local Scriptbill storage for the session when the note was logged in. On log out,
	//this variable is deleted, when logging in again this variable will be recreated and will 
	//remain constant for the rest of the session. To ensure that we set the variable as false
	//and set it once. Only when it is false will we have to recreate it.
	static #passwordKey = false;
	
	//the rate at which credit leaves the exchange market, if set to 0.5, then only half of the credit will leave 
	//the exchange market at every demand. If we have 1 Scriptbills in the market, and 1 billion dollars was 
	//supplied in demand for the credit, the total value of the credit will be 2 billion dollars because only 0.5 
	//Scriptbills will be supplied at the $1 billion based on the mining rate.
	static #miningRate   = 0.5;
	
	static walletID; //Scriptbill is the unique identifier of a particular user in the network. With Scriptbill, all Scriptbill note that the person holds will be in one place.
	//scriptbill will store all the responses it gets from servers it communicate with in Scriptbill variable. 
	//set to be static async to help it eaily accessed outside the scope of Scriptbill class.
	static response;
	
	//the interest rate set by Scriptbank on crediter who will choose to use Scriptbill credit instead of demanding for it.
	static interestRate = 0.2;
	
	//the rate at which the interest will be calculated. Values include PT for "Per Transaction", DL for "Daily", 
	//HL for "Hourly" E{N}D for "Every N Days", E{N}H for "Every N Hours", E{N}M for "Every N Minutes", E{N}W for 
	//"Every N weeks" WL for "Every Week" E{N}M for "Every N Months" ML for "Monthly"
	static interestType = "PT";
	
	//JSEncrypt = new JSEncrypt({default_key_size: 2048});
	static default_key_size = 10;
	//important to set the default scriptbill server as a constant here so that the script can easily 
	//work with it and won't be causing difficulty while updating.
	static #default_scriptbill_server = "http://localhost/wordpress";//"https://scriptbank.com.ng";//"https://dev-cmbf-bank.pantheonsite.io/";
	//the current Scriptbill note that is being instantiated will rest in Scriptbill variable.
	//the session storage variable helps further share the information on the latest note.
	//the session storage of the current note is updated everytime a note is saved or gotten from the database.
	static #note;
	//the current note. Contains public keys of the private key stored on the note variable.
	static currentNote;
	//data that would be sent will be stored on this variable
	static data;
	//user inputted password that may be required to decrypt or encypt some important financial data from
	//the Scriptbill note.
	static #password;	
	//the exchange transaction variables for selling a credit type.
	static sellCredit;
	//the exchange transaction variable for buying a credit type.
	static buyCredit;
	//the transaction value of a particular transaction may be kept here for transactions like credit
	//and stock exchanges.
	static transValue;
	
	//used majorly to store strings that will be hashed later by the hash functions.
	static string;
	
	//alpha numeric
	static #alpha_numeric = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ1234567890";
	
	//extended varchar.
	static #varchar       = "~`!@#$%^&*()-_=+[]{}\\|;:\"'<,>.?/";
	
	//send transaction types in array.
	static transSend = ['SEND'/*Normal Sending Money*/, 'INVEST'/*A Special Transaction Type That Describes an Investment, Different From Defined Stock or Bond Investment*/, 'STOCKPAY'/*Describes a Dividend Payment*/, 'BUYPRODUCT'/*Describes the Purchase of a Product*/, 'BUYSTOCK'/*Describes the Purchase of a Stock*/, 'BUYBOND'/*Describes the Purchase of a Bond*/, 'BONDPAY'/*Describes an Interest Payment*/, 'PROFITSHARING'/*Describes a Profit Sharing Transaction*/, 'PRODUCTSUB'/*Describes a Product Subscription Transaction*/, 'CANCELLED'/*Describes a Cancelled Transaction*/, 'INTERESTPAY'/*A transaction type to pay interest from a loan*/];
	
	static version 	= "1.0.0";
	
	//recieve transaction types in array.
	static transRecieve = ['RECIEVE'/*Normal Recieve Transaction From SEND*/, 'INVESTRECIEVE'/*Describes the reception of an Investment from INVEST*/, 'PROFITRECIEVE'/*Describes the reception of profit from PROFITSHARING*/, 'STOCKRECIEVE'/*Describes the reception of a Stock when purchased*/, 'BONDRECIEVE'/*Describes the reception of Bond when Purchased*/, "CONFIRM"/*A trnasaction block teling the network that a fiat credit deposit has been confirmed by the crediter and the depositor can recieve the credits involved in the transaction. a crediter may use CANCELLED transaction to stop his credit from going to the depositor. The depositor must honor this request with an AGREEMENTSIGN transaction to release the withdraw credit to be usable by the note holder.*/];
	
	//other transaction types that do not update the value of the note.
	static otherTrans   = ['UPDATE'/*A transaction type that describes the Update of a Particular Value in the Note without Updating the Value*/, 'CREATEPRODUCT'/*Just like Update Transaction, it helps the note include a Product to the database*/, 'CREATE'/*This transaction describes that a new note or wallet has been created*/, 'CREATEBUDGET'/*This transaction helps include a budget into the datatable*/, 'EXCHANGE'/*This transaction describes an exchange request in the database*/, 'AGREEMENTSIGN'/*This transaction type is an update transaction that describes that an agreement is being signed by the sender, telling the network that the sender is satisfied with a transaction*/, 'AGREEMENTREQUEST'/*This is a transaction type sent by the reciever of a transaction, requesting that the sender cancels the execution of a set agreement in a transaction*/, 'SELLSTOCK'/*This is a transaction request by a stock note seller, telling the nettwork he has stocks to be sold.*/, 'QUOTESTOCK'/*This transaction request that helps the invest create an actual stock note.*/, 'QUOTE'/*This transType is used to quote a Contract details to a recipient Who should be the contractee.*/, 'SOLDSTOCK'/*This is a transaction request telling the network that a particular stock has been sold.*/, 'SELLBOND'/*Transtype desribing a request to sell bonds*/, 'SOLDBOND'/*a transaction request telling the network a particular bond have been sold.*/, 'QUOTEBOND'/*a transaction request to quote a bond note, just like a create transType*/, "WITHDRAW"/*This transaction indicates to the network that a user with a fiat or Crypto credit Type for instance USD has indicated withdrawal. Indicating withdrawal for a Scriptbill credit type, because it'this.s possible will not work because no one will have the fiat credit type to supply.*/, "DEPOSIT"/*A transaction type Scriptbill Use in detecting that a Deposit of a fiat credit has been carried out. When the transaction block is made, the network assumes that the depositor has made a successful deposit. The credit supplier will get an alert that a deposit transaction has been made and should confirm it. If confirmed, a CONFIRMED transaction is created. If the credit holder the deposit has not been made, he can delay the transaction until there is a confirmation. If the depositor feels he has made the deposit and there is no confirmation transaction, then the DEPOSIT transaction remains a budget in the creditors note, he / she will not be able to use the value of the CREDIT held until he has resolved the issue with the depositor. Sometimes a third party may be invited to resolve the issue.*/];
	
	//neccessary for programmers to determine whether to alert the account details in an exchange
	//transaction or not.
	static alertDetails = true;
	//to help insert a product into the Scriptbill database that can be accessed and even used by any 
	//server in the world. we design the static async product config variable that will guide the product 
	//creator on the right kind of information needed to insert a product successfully in the Scriptbill 
	//database.
	static productConfig = {
		'value'			: 0,//the original value of the product.
		'units'			: 0,//the units of products available in the System
		'totalUnits'	: 0,//total units of product included to the scriptbill systems
		'name'			: '', // the name of the product.
		'description'	: '',//description of product, HTML allowed
		'images'		: '',//urls to images that describe the product
		'videos'		: '', //urls to videos that describe the product
		'creditType'	: 'SBCRD', //the type of credit which the product is being valued.
		'sharingRate'	: 0.2,//the profit sharing rate on the product
		'blockExpiry'	: '1 months', //tells time the transaction block of the buyer will expire.
		
	};
	
	//this is the ranks that will be inherited by Scriptbill users based on their
	//rank value.
	static #scriptbillRanks = {
				"IFVSSKJBHKSBUD" 	: { "min" : 0, "max" : 10, "fellowship" : "CMBF Beginner"/*Fellowship Rank*/, "military" : "CMBF Recruit"/*Military Rank*/, "business" : "CMBF Apprentice"/*Business Rank*/, "businessManager" : "CMBF Trainee"/*Business Manager Rank*/, "political" : "CMBF Council Member"/*Political Rank*/, "investment" : "CMBF Asset Seeker"/*Investment Rank*/,"credit_level": 100/*Number of Scriptbill Credit the user can get per transaction when balance is low*/, "code": "IFVSSKJBHKSBUD"/*This is the code that tells the network about the user rank*/, "slot": 1/*This is the number of users that can fit in to ranks in this level*/, "level": 1},
				"BJHVKDKNVKDXHCIJ" 	: {"min" : 10, "max" : 100, "fellowship":"CMBF Member", "military":"CMBF Recruit Two","business":"CMBF Apprentice Two", "businessManager":"CMBF Executive Trainee", "political":"CMBF Council Member Two", "investment":"CMBF Asset Taker", "credit_level": 1000, "code": "BJHVKDKNVKDXHCIJ", "slot": 0.9, "level": 2},			
				"SJUSGRFIDUGVDISCSI"	: { "min": 100, "max": 1000, "fellowship":"CMBF Trainee Worker", "military":"CMBF Private", "business":"CMBF Establisher", "businessManager":"CMBF Officer", "political":"CMBF Councilor", "investment":"CMBF Asset Bringer","credit_level": 10000, "code": "SJUSGRFIDUGVDISCSI" , "slot": 0.8/*Telling the rate of persons that can particpate against the total population in the world*/, "level": 3},
				"HFOSBTIUSHGLDJNXK"	: { "min": 1000, "max": 5000, "fellowship":"CMBF Worker", "military":"CMBF Private Two", "business":"CMBF Proprietor", "businessManager":"CMBF Assistant Business Officer", "political":"CMBF Senior Councilor", "investment":"CMBF Asset Owner", "credit_level": 50000, "code": "HFOSBTIUSHGLDJNXK", "slot": 0.7, "level": 4},
				"LDUIDLNFBPVUADBJKNA"	: { "min":5000, "max": 10000, "fellowship":"CMBF Senior Worker", "military":"CMBF Private Second Class", "business":"CMBF Senior Proprietor", "businessManager":"CMBF Assistant Senior Business Officer", "political":"CMBF Local Councilor", "investment":"CMBF Asset Raiser", "credit_level": 100000, "code": "DUIDLNFBPVUADBJKNA", "slot": 0.6, "level": 5 },
				"OVUBSAFBVDSILFNSOH" : { "min":10000, "max":20000, "fellowship":"CMBF Assistant Deacon", "military":"CMBF Private First Class", "business":"CMBF Executive Proprietor", "businessManager":"CMBF Business Officer", "political":"CMBF Area Councilor", "investment":"CMBF Asset Multiplier", "credit_level": 200000, "code": "OVUBSAFBVDSILFNSOH", "slot": 0.5, "level": 6 },
				"DIBVOSIBASVOVS"	: { "min":20000, "max": 50000, "fellowship":"CMBF Deacon", "military":"CMBF Lance Corporal", "business":"CMBF Senior Proprietor", "businessManager":"CMBF Deputy Business Officer",  "political":"CMBF Inspecting Councilor", "investment":"CMBF Asset Grader", "credit_level": 500000, "code": "DIBVOSIBASVOVS", "slot": 0.45, "level": 7},
				"DFOBVODBVJODZBN"	: {"min":50000, "max":100000, "fellowship":"CMBF Senior Deacon", "military":"CMBF Corporal", "business":"CMBF Senior Executive Proprietor", "businessManager":"CMBF Senior Deputy Business Officer", "political":"CMBF Deputy Local Chairman", "investment":"CMBF Asset Manager Gold", "credit_level": 1000000, "code":"DFOBVODBVJODZBN", "slot": 0.4, "level": 8},
				"OBSFBVIAPVVPAVSB"	: {"min":100000, "max": 250000, "fellowship":"CMBF High Deacon", "military":"CMBF High Corporal", "business":"CMBF Sleeping Business Partner", "businessManager":"CMBF Business Officer", "political":"CMBF Local Chairman Adviser", "investment":"CMBF Asset Manager Platinum", "credit_level": 2500000, "code":"OBSFBVIAPVVPAVSB", "slot": 0.35, "level": 9},
				"OBVISBAUBVIFBUI"	: {"min": 250000, "max": 500000, "fellowship":"CMBF Assistant Priest", "military":"CMBF Sergent", "business":"CMBF Assisting Business Partner", "businessManager":"CMBF Deputy Senior Business Officer", "political":"CMBF Local Chairman Cabin Member", "investment":"CMBF Asset Manager Diamond", "credit_level": 5000000, "code":"OBVISBAUBVIFBUI", "slot": 0.3, "level": 10},
				"BDSBVSDIPBFUIDBVUB"	: {"min":500000, "max":1000000, "fellowship":"CMBF Priest", "military":"CMBF Senior Sergent", "business":"CMBF Acting Business Partner", "businessManager":"CMBF Senior Business Officer", "political":"CMBF Local Chairman", "investment":"CMBF Asset Manager Star", "credit_level":10000000, "code":"BDSBVSDIPBFUIDBVUB", "slot": 0.25, "level": 11},
				"GSUAJBVDFSBUISBUIBSDUIB"	: {"min":1000000, "max":2500000, "fellowship":"CMBF High Priest", "military":"CMBF Staff Sergent", "business":"CMBF Business Partner", "businessManager":"CMBF Assistant Business Manager", "political":"CMBF Local Inspector", "investment":"CMBF Asset Manager Galaxy", "credit_level":25000000, "code":"GSUAJBVDFSBUISBUIBSDUIB", "slot": 0.2, "level": 12},
				"BVAHKBVSDIUFVUIGAUBUIDA"	: {"min":2500000, "max":5000000, "fellowship":"CMBF Senior High Priest", "military":"CMBF Warrant Officer", "business":"CMBF Senior Business Partner", "businessManager":"CMBF Acting Business Manager", "political":"CMBF Honourable", "investment":"CMBF High Asset Manager Gold", "credit_level":50000000, "code":"BVAHKBVSDIUFVUIGAUBUIDA", "slot": 0.15, "level": 13},
				"IBDIBDVIBSDZIBFIUFBBDXKJV"	: {"min":5000000, "max":10000000, "fellowship":"CMBF Chief Priest", "military":"CMBF Senior Warrant Officer", "business":"CMBF Business Gold Partner", "businessManager":"CMBF Business Manager", "political":"CMBF Golden Honourable", "investment":"CMBF High Asset Manager Platinum", "credit_level":100000000, "code":"IBDIBDVIBSDZIBFIUFBBDXKJV", "slot": 0.1, "level": 14},
				"HASBVHIOADIYVBDIHABIDB"	: {"min":10000000, "max":25000000, "fellowship":"CMBF High Chief Priest", "military":"CMBF Deputy Chief Warrant Officer", "business":"CMBF Business Platinum Partner", "businessManager":"CMBF Assistant Local Business Manager", "political":"CMBF Platinum Honourable", "investment":"CMBF High Asset Manager Diamond", "credit_level":250000000, "code":"HASBVHIOADIYVBDIHABIDB", "slot": 0.05, "level": 15},
				"OADBVIUDBFVUBSDUFBDA"	: {"min":25000000, "max":50000000, "fellowship":"CMBF Assistant Bishop", "military":"CMBF Chief Warrant Officer 1", "business":"CMBF Business Star Partner", "businessManager":"CMBF Local Business Manager", "political":"CMBF Star Honourable", "investment":"CMBF High Asset Manager Star", "credit_level":500000000, "code":"OADBVIUDBFVUBSDUFBDA", "slot": 0.025, "level": 16},				
				"JAFBVJPBDIOVPBADBABUABV"	: {"min":50000000, "max":100000000, "fellowship":"CMBF Area Bishop", "military":"CMBF Chief Warrant Officer 2", "business":"CMBF Business Product Inventor", "businessManager":"CMBF Assistant Area Business Manager", "political":"CMBF House Clerk", "investment":"CMBF Senior Asset Manager", "credit_level":1000000000, "code":"JAFBVJPBDIOVPBADBABUABV", "slot": 0.0125, "level": 17},
				"JSBDVIABVIDUHVADUPHUAH"	: {"min":100000000, "max":125000000, "fellowship":"CMBF Assistant State Bishop", "military":"CMBF Chief Warrant Officer 3", "business":"CMBF Business Golden Product Inventor", "businessManager":"CMBF Area Business Manager", "political":"CMBF Deputy Chief Whip", "investment":"CMBF Senior Asset Manager Gold", "credit_level":1250000000, "code":"JSBDVIABVIDUHVADUPHUAH", "slot": 0.00625, "level": 18},//Deputy Lieutenant
				"HIOADSOVHOIAHIOHOVHOHHVOAIH"	: {"min":125000000, "max":150000000, "fellowship":"CMBF State Bishop", "military":"CMBF Chief Warrant Officer 4", "business":"CMBF Business Platinum Product Inventor", "businessManager":"CMBF Assistant State Business Manager", "political":"CMBF Chief Whip", "investment":"CMBF Senior Asset Manager Platinum", "credit_level":1500000000, "code":"HIOADSOVHOIAHIOHOVHOHHVOAIH", "slot": 0.003125, "level": 19},//
				"NKSLFNMKLNDSBFKLNDKNLKDNLKAD"	: {"min":150000000, "max":200000000, "fellowship":"CMBF Assistant Regional Bishop", "military":"CMBF Chief Warrant Officer 5", "business":"CMBF Business Diamond Product Inventor", "businessManager": "CMBF State Business Manager", "political":"CMBF Deputy Majority Leader", "investment":"CMBF Senior Asset Manager Star", "credit_level":200000000, "code":"NKSLFNMKLNDSBFKLNDKNLKDNLKAD", "slot": 0.0015625, "level": 20},//
				"AOJBHVUOHSUOBVSJBVUJABUIOABU"	: {"min":200000000, "max":225000000, "fellowship":"CMBF Regional Bishop","military":"CMBF Deputy Lieutenant", "business":"CMBF Business Star Product Inventor", "businessManager":"CMBF Assistant Regional Business Manager", "political":"CMBF Majority Leader", "investment":"CMBF Asset Director", "credit_level":2250000000, "code":"AOJBHVUOHSUOBVSJBVUJABUIOABU", "slot": 0.00078125, "level": 21},//Regional Lieutenant
				"Level 19"	: {"min":225000000, "max":250000000, "fellowship":"CMBF Assistant National Bishop", "military":"CMBF Second Lieutenant", "business":"CMBF Business Product Manager", "businessManager":"CMBF Regional Business Manager", "political":"CMBF Deputy Speaker", "investment":"CMBF Asset Director Gold", "credit_level":2500000000, "code":"OHSBUBSVUIBSDIUBVSUIB", "slot": 0.000390625, "level": 22},//
				"SDBUIFBVSIBISBVHBVIUBSDI"	: {"min":250000000, "max":300000000, "fellowship":"CMBF National Bishop", "military":"CMBF Lieutenant", "business":"CMBF Business Gold Product Manager", "businessManager":"CMBF Assistant National Business Manager", "political":"CMBF House Speaker", "investment":"CMBF Asset Director Platinum", "credit_level":3000000000, "code":"SDBUIFBVSIBISBVHBVIUBSDI", "slot": 0.0001953125, "level": 23},
				"IAVBIBAIABUBDIUBVIBUIDZ"	: {"min":300000000, "max":350000000, "fellowship":"CMBF ArchBishop", "military":"CMBF State Lieutenant", "business":"CMBF Business Platinum Product Manager", "businessManager":"CMBF National Business Manager", "political":"CMBF Deputy State Governor", "investment":"CMBF Asset Director Diamond", "credit_level":3500000000, "code":"IAVBIBAIABUBDIUBVIBUIDZ", "slot": 0.00009765625, "level": 24 },//Captain
				"DFBIHBVSIBIUSDBIUVBIS"	: {"min":350000000, "max":400000000, "fellowship":"CMBF Senior ArchBishop", "military":"CMBF National Lieutenant", "business":"CMBF Business Star Product Manager", "businessManager":"CMBF Assistant Continental Business Manager", "political":"CMBF State Governor", "investment":"CMBF Asset Director Star", "credit_level":4000000000, "code":"DFBIHBVSIBIUSDBIUVBIS", "slot": 0.000048828125, "level": 25},//Senior Captain
				"HBHDVIDBZHVBDILBUIDB"	: {"min":400000000, "max":500000000, "fellowship":"CMBF Continental ArchBishop", "military":"CMBF Captain", "business":"CMBF Business Product Director", "businessManager":"CMBF Continental Business Manager", "political":"CMBF State Inspector", "investment":"CMBF Asset Commander", "credit_level":5000000000, "code":"HBHDVIDBZHVBDILBUIDB", "slot": 0.0000244140625, "level": 26},
				"DJBVFIBDIUBVUIDBUIDUI"	: {"min":500000000, "max":600000000, "fellowship":"CMBF Senior Continental ArchBishop", "military":"CMBF Senior Captain", "business":"CMBF Business Gold Product Director", "businessManager":"CMBF Assistant General Business Manager", "political":"CMBF Deputy Minister of State", "investment":"CMBF Asset Commander", "credit_level":6000000000, "code":"DJBVFIBDIUBVUIDBUIDUI", "slot": 0.00001220703125, "level": 27 },
				"SJBVISBSIVBIPDBVBIDBUBDVZJKL"	: {"min": 600000000, "max":750000000, "fellowship":"CMBF Chief ArchBishop", "military":"CMBF Chief Captain", "business":"CMBF Business Platinum Product Director", "businessManager":"CMBF Assistant General Business Manager", "political":"CMBF Minister of State", "investment":"CMBF Asset Commander Gold", "credit_level":7500000000, "code":"SJBVISBSIVBIPDBVBIDBUBDVZJKL", "slot": 8.138020833333333e-6, "level": 28},
				"HIVDHVBDHDIBVIADUIBU"	: {"min":750000000, "max":900000000, "fellowship":"CMBF Senior ArchBishop", "military":"CMBF Captain Major", "business":"CMBF Business Diamond Product Director", "businessManager":"CMBF Deputy General Business Manager", "political":"CMBF Assistant Regional Minister", "investment":"CMBF Asset Commander Platinum", "credit_level":9000000000, "code":"HIVDHVBDHDIBVIADUIBU", "slot": 6.781684027777778e-6, "level": 29},
				"HBVIHADVFIBVSJKLBKBAS"	: {"min":900000000, "max": 1100000000, "fellowship":"CMBF Assistant National Cardinal", "military":"CMBF Major", "business":"CMBF Business Star Product Director", "businessManager":"CMBF General Business Manager", "political":"CMBF Regional Minister", "investment":"CMBF Asset Commander Star", "credit_level":11000000000, "code":"HBVIHADVFIBVSJKLBKBAS", "slot": 5.651403356481481e-6, "level": 30},
				"BDHBSVIDBVIUSFGIBVAYH"	: {"min": 1100000000, "max":1300000000, "fellowship":"CMBF National Cardinal", "military":"CMBF Chief Major", "business":"CMBF Business Product Chairman", "businessManager":"CMBF Assistant State Business Director", "political":"CMBF Assistant National Minister", "investment":"CMBF Asset Analyst", "credit_level":13000000000, "code":"BDHBSVIDBVIUSFGIBVAYH", "slot": 5.651403356481481e-6, "level": 31},
				"DHBFVSSDHBJHVDBJKSDJHKBV"	: {"min":1300000000, "max": 1500000000, "fellowship":"CMBF Assistant Continental Cardinal", "military":"CMBF Lieutenant Colonel", "business":"CMBF Business Gold Product Chairman", "businessManager":"CMBF State Business Director", "political":"CMBF National Minister", "investment":"CMBF Gold Asset Analyst", "credit_level":15000000000, "code":"DHBFVSSDHBJHVDBJKSDJHKBV", "slot": 5.651403356481481e-6, "level": 32 },
				"KSDBHFBVGYIOGVYISBGBDYIF"	: {"min":1500000000, "max":1750000000, "fellowship":"CMBF Continental Cardinal", "military":"CMBF Colonel", "business":"CMBF Business Platinum Product Chairman", "businessManager":"CMBF Assistant Regional Business Director", "political":"CMBF National House Member", "investment":"CMBF Platinum Asset Analyst", "credit_level":17500000000, "code":"KSDBHFBVGYIOGVYISBGBDYIF", "slot": 4.467512534767969e-6, "level": 33},
				"OJBDFAUBVIDUBUISBUISD"	: {"min":1750000000, "max":2000000000, "fellowship":"CMBF Pope Carbinet Member", "military":"CMBF Colonel Major", "business":"CMBF Business Diamond Product Chairman", "businessManager":"CMBF Regional Business Director", "political":"CMBF National House Leader", "investment":"CMBF Diamond Asset Analyst", "credit_level":20000000000, "code":"OJBDFAUBVIDUBUISBUISD", "slot": 3.722927112306641e-6, "level": 34},
				"JOBAFDUBVSDUIBSDIPGBUFUIA"	: {"min":2000000000, "max":2300000000, "fellowship":"CMBF Pope Carbinet Leader", "military":"CMBF Brigadier General","business":"CMBF Business Star Product Chairman", "businessManager":"CMBF Assistant National Business Director", "political":"CMBF National House Minority Whip", "investment":"CMBF Star Asset Analyst", "credit_level":23000000000, "code":"JOBAFDUBVSDUIBSDIPGBUFUIA", "slot": 2.978341689845313e-6, "level": 35},
				"OFBNIBFVIFBISBJKLSNVJB"	: {"min":2300000000, "max":2600000000, "fellowship":"CMBF Pope Carbinet Minority Whip Leader", "military":"CMBF Brigadier General Star 2", "business":"CMBF Business Vice Executive State Product Chairman", "businessManager":"CMBF Deputy National Business Director", "political":"CMBF National House Majority Whip", "investment":"CMBF Asset Trader", "credit_level":26000000000, "code":"OFBNIBFVIFBISBJKLSNVJB", "slot": 2.291032069111779e-6, "level": 36 },
				"IHBSDIVBSUIOBUISDBUISDFI"	: {"min":2600000000, "max":3000000000,"fellowship":"CMBF Pope Carbinet Majority Whip Leader", "military":"CMBF Brigadier General Star 3", "business":"CMBF Business Executive State Product Chairman", "businessManager":"CMBF National Business Director", "political":"CMBF Assistant National House Overseer", "investment":"CMBF Gold Asset Trader", "credit_level":30000000000, "code":"IHBSDIVBSUIOBUISDBUISDFI", "slot": 1.697060791934651e-6, "level": 37},
				"HKLBVDAHBVUSUIHBKDJNDKFN"	: { "min":3000000000, "max":3400000000,"fellowship":"CMBF Pope Assistant Carbinet Overseer", "military":"CMBF Brigadier General Star 4", "business":"CMBF Business Vice Executive Regional Product Chairman", "businessManager":"CMBF Vice Continental Business Director", "political":"CMBF National House Overseer", "investment":"CMBF Platinum Asset Trader", "credit_level":34000000000, "code":"HKLBVDAHBVUSUIHBKDJNDKFN", "slot": 1.212186279953322e-6, "level": 38},
				"OJBNSUIBVDUIBVDIIUD"	: {"min":3400000000, "max":3800000000,"fellowship":"CMBF Pope Carbinet Overseer", "military":"CMBF Brigadier General Star 5", "business":"CMBF Business Executive Regional Product Chairman", "businessManager":"CMBF Continental Business Director", "political":"CMBF National House Assistant Counsellor", "investment":"CMBF Diamond Asset Trader", "credit_level":38000000000, "code":"OJBNSUIBVDUIBVDIIUD", "slot": 8.081241866355482e-7, "level": 39},
				"JSFBHBSDVOBDBSDLJD"	: {"min":3800000000, "max":4200000000,"fellowship":"CMBF Pope Carbinet Assistant Counsellor", "military":"CMBF Major General", "business":"CMBF Business Vice Executive National Product Chairman", "businessManager":"CMBF Vice Principal Business Director", "political":"CMBF National House Counsellor", "investment":"CMBF Star Asset Trader", "credit_level":42000000000, "code":"JSFBHBSDVOBDBSDLJD", "slot": 5.050776166472176e-7, "level": 40},
				"JNDJNSDFKVJNJDONVUOSDBUISD"	: {"min":4200000000, "max":4700000000,"fellowship":"CMBF Pope Carbinet Counsellor", "military":"CMBF Major General Star 2", "business":"CMBF Business Executive National Product Chairman", "businessManager":"CMBF Principal Business Director", "political":"CMBF National Minority House Leader", "investment":"CMBF Asset Market Leader", "credit_level":47000000000, "code":"JNDJNSDFKVJNJDONVUOSDBUISD", "slot": 2.971044803807163e-7, "level": 41},
				"BHIBFFVUIBUISBVIFLKJDZSHJ"	: {"min":4700000000, "max":5200000000,"fellowship":"CMBF Pope Carbinet Minority Leader", "military":"CMBF Major General Star 3", "business":"CMBF Business Vice Executive Continental Product Chairman", "businessManager":"CMBF Principal Gold Business Director", "political":"CMBF National Majority House Leader", "investment":"CMBF Gold Asset Market Leader", "credit_level":52000000000, "code":"BHIBFFVUIBUISBVIFLKJDZSHJ", "slot": 1.650580446559535e-7, "level": 42},
				"KLBSDHBVFISBJKLSFZIDL"	: {"min":5200000000, "max":5700000000,"fellowship":"CMBF Pope Carbinet Majority Leader", "military":"CMBF Major General Star 4", "business":"CMBF Business Executive Continental Product Chairman", "businessManager":"CMBF Principal Platinum Business Director", "political":"CMBF National Council House Chair", "investment":"CMBF Platinum Asset Market Leader", "credit_level":57000000000, "code":"KLBSDHBVFISBJKLSFZIDL", "slot": 8.687265508208077e-8, "level": 43},
				"JBSDVIBUIBDUIVBUBDSU"	: {"min":5700000000, "max":6300000000,"fellowship":"CMBF Pope Carbinet Council Chair", "military":"CMBF Major General Star 5", "business":"CMBF Business Principal", "businessManager":"CMBF Principal Diamond Business Director", "political":"CMBF National House Secretary", "investment":"CMBF Star Asset Market Leader", "credit_level":63000000000, "code":"JBSDVIBUIBDUIVBUBDSU", "slot": 4.343632754104039e-8, "level": 44},
				"HIBSVHUBSDUYBSDVUSZJKZS"	: {"min":6300000000, "max":6900000000,"fellowship":"CMBF Pope Carbinet Council Secretary", "military":"CMBF Lieutenant General", "business":"CMBF Business Don", "businessManager":"CMBF Principal Star Business Director", "political":"CMBF National House Vice President", "investment":"CMBF Asset Holder", "credit_level":69000000000, "code":"HIBSVHUBSDUYBSDVUSZJKZS", "slot": 4.343632754104039e-8, "level": 45},
				"IHDBYHSDBZYUHDSFJIAFUYVBGV"	: {"min":6900000000, "max":7500000000,"fellowship":"CMBF Pope Carbinet Vice Chairman", "military":"CMBF Lieutenant General Star 1", "business":"CMBF Business Don King", "businessManager":"CMBF Business Vice Chairman", "political":"CMBF National House President", "investment":"CMBF Gold Asset Holder", "credit_level":75000000000, "code":"IHDBYHSDBZYUHDSFJIAFUYVBGV", "slot": 2.17181637705202e-8, "level": 46},
				"JBJIBDISBSDVHIBDZXJKS"	: {"min":7500000000, "max":8200000000,"fellowship":"CMBF Pope Carbinet Chairman", "military":"CMBF Lieutenant General Star 2", "business":"CMBF Business Don King 5", "businessManager":"CMBF Business Vice Chairman Advicer", "political":"CMBF National Adviser", "investment":"CMBF Platinum Asset Holder", "credit_level":82000000000, "code":"JBJIBDISBSDVHIBDZXJKS", "slot": 1.447877584701346e-8, "level": 47},
				"HSDBHBDFVYIBSHBNVSINBSDIL"	: {"min":8200000000, "max":8900000000,"fellowship":"CMBF Pope Adviser", "military":"CMBF Lieutenant General Star 3", "business":"CMBF Business Don King 4", "businessManager":"CMBF Special Business Vice Chairman Advicer", "political":"CMBF Special National Adviser", "investment":"CMBF Diamond Asset Holder", "credit_level":89000000000, "code":"HSDBHBDFVYIBSHBNVSINBSDIL", "slot": 1.034198274786676e-8, "level": 49},
				"SBIBFGUIBNXSDIBNVIBDFSIBNSI"	: {"min":8900000000, "max":9600000000,"fellowship":"CMBF Pope Special Adviser", "military":"CMBF Lieutenant General Star 4", "business":"CMBF Business Don King 3", "businessManager":"CMBF Business Vice Chairman", "political":"CMBF National Chief of Staff", "investment":"CMBF Star Asset Holder", "credit_level":96000000000, "code":"SBIBFGUIBNXSDIBNVIBDFSIBNSI", "slot": 8.618318956555631e-9, "level": 50},
				"HIBSDIBFVUISDBUISDBIUB"	: {"min":9600000000, "max":10300000000,"fellowship":"CMBF Pope Special Adviser", "military":"CMBF Lieutenant General Star 5", "business":"CMBF Business Don King 2", "businessManager":"CMBF Business Chairman Adviser", "political":"CMBF National Senate Vice President", "investment":"CMBF Investor", "credit_level":103000000000, "code":"HIBSDIBFVUISDBUISDBIUB", "slot": 8.618318956555631e-9, "level": 51},
				"HBADYIVBADYBCIBDAIBUID"	: {"min":10300000000, "max":11100000000,"fellowship":"CMBF Assistant Pope", "military":"CMBF General", "business":"CMBF Business Don King 1", "businessManager":"CMBF Special Business Chairman Adviser", "political":"CMBF National Senate President", "investment":"CMBF Special Investor", "credit_level":111000000000, "code":"HBADYIVBADYBCIBDAIBUID", "slot": 8.601116723109412e-9, "level":52 },
				"BJDIYBVISBUIDFBIUDBUI"	: {"min":11100000000, "max":12000000000,"fellowship":"CMBF Deputy Pope", "military":"CMBF General Star 2", "business":"CMBF Don Knight", "businessManager":"CMBF Business Chairman Adviser", "political":"CMBF National Vice President", "investment":"CMBF Principal Investor", "credit_level":120000000000, "code":"BJDIYBVISBUIDFBIUDBUI", "slot": 8.432467375597463e-9, "level": 53},
				"SIHFBFVIDBXLBKVLJD"	: {"min":12000000000, "max":20000000000,"fellowship":"CMBF Pope Knight", "military":"CMBF General Star 3", "business":"CMBF High Knight", "businessManager":"CMBF Business Chairman", "political":"CMBF National President", "investment":"CMBF Investor General", "credit_level":200000000000, "code":"SIHFBFVIDBXLBKVLJD", "slot": 4.216233687798731e-10, "level": 54},
				"IBSFUIVBDFUIBGVIUSDUISDUBVUB"	: {"min":20000000000, "max":Infinity,"fellowship":"CMBF Pope", "military":"CMBF Commander General", "business":"CMBF Don King 1", "businessManager":"CMBF Business Chairman", "political":"CMBF National President", "investment":"CMBF Investor General", "credit_level":Infinity, "code":"IBSFUIVBDFUIBGVIUSDUISDUBVUB", "slot": 1.686493475119493e-10, "level": 55}				
	};
	
	//bitcoin addresses to accept payment from Scriptbill Demanders
	static #ScriptbankAccounts = [		
			'bc1qxxscuyxs2szjrnwrpqfzehf4rmxmz9wn99jyqd',
			'bc1qex4ez3klrrgkv9kqm7eyvxgx4p4kgvpd64h2pa',
			'bc1ql2k9qq8rdaflu27nh95kv8a9dt8qj0uxrjunhc',
			'bc1qq03nhnqekxkdhp4ksqfjy8gqhwjq69jfm9pg2l',
			'bc1qauqa5vqw5fjeyjvftph9r943vtpvk9cvzw652m',		
			'1GJYa6ZTq7Xog5whGCefjeNNgV4G7ycuyN',
			'14qQva9goeY5yZ5Ra3MLeN9JKLJc1Jp5RT',
			'1Hoz1fRVQM3UDbWnCnr7hKKy88Y8DySTVf',
			'15CdngZxKZNmN8w4YxF7vdcrsxA1DaPNRK',
			'1PF8JFqz8knPstX3Rsjr2nWZexStHBxaZc',
			'1FjzmN4oTatpFgavzWr7M4oah8poAgvMcr',		
			'1LqxtuLtMyW3fKTRqiFMfe3xfVCxRwtwWh',
			'189HMvedKSff4REqULR88jjoUykca1GvAZ',
			'1LnfVABHM5JEq235NQLu8mvW9ipNsSL4GT',
			'1K23z4TbwLLUAbQbXgYCUz7E5rae4BXiGN',
			'19iGbNoSYZetCUtr92EAek8xAwQGubuLaz',		
			'1DvMpf6XCbyHh5vhVhgNM3kJMj7fuZjtbh',
			'1CVyZG4he3RypAAfhLaHWCo74Zx6X5YYH2',
			'18yq6GxhheZ1DJ9nbLFxrAX55d2mQR32iC',
			'13a1RFu3DkUFQxop5Z6PaSqw2YV77KdYne',
			'1FPFyMjGLbr4XGDXQ2K25DcKxsNmuCworT',		
			'1B8uTmjxcGamfgETZDzwFQPGsMnCiFNBWc',
			'1ArVLmQuYYYdghAJafPXutED94stJ6Hjz5',
			'1DNhkUoAP45enuB7qUYtpXe1FCYP2ankki',
			'1wLfkvyDhgJCX4bRxbisako4X6GTBGFTk',
			'1BxThqkxGa68AuabSAFz1fEt6kywnWfyGd',		
			'1CGsCbWzQqZgWXkkoo2CyzGmm5jnFtTH8f',
			'1Nc2ssQ2mepWvpJ4bwpJsu8zTcy1uBQ8Km',
			'1CDRzQZmEaBRFZJEpdB1cxPTg91DzhMcD5',
			'12C9YkNJCfkHU3cZuCqSFEEC2K6iyCTSsC',
			'1LnzArSXWxL3L3RvUbuyUkK2cc3M9CGTrs'
		 ];	
	
	static #isExchangeMarketMining = false;
	static #isExchangeDeposit		= false;
	
	static defaultSub = {
		"subSpread"	: "1 week",
		"nextSub"	: "",
		"subUnit"	: 1, //total subscription to be made.
		"productID"	: "",//product making subscription to.
		"value"		: 0,//the value of the subscription.
		"lastSub"	: 0,//the amount to be paid when running the last subscription.
	};
	
	//the default content of a Scriptbill note. This does not means that Scriptbill is limited to Scriptbill
	//content alone. Scriptbill could stand as database to decentralized application who take financial
	//security serious.
	static defaultScriptbill = {
		walletID 	: '',//Scriptbill is the unique wallet ID of the user, Scriptbill data is used to cryptographically link all the account of a particular user to a wallet. So that it can be recognized everywhere it is found.
		noteID		: '0000',//Scriptbill a unique nonce of the note, it increase everytime there is a transaction using Scriptbill note
		noteAddress	: '', //Scriptbill is the public key of the note, it is used to encrypt data that should be read by Scriptbill note alone.
		noteSecret	: '', //Scriptbill is the private key of the note, used by the note owner to recieve funds sent to Scriptbill note address. If you think your note Secret is compromized, you can recreate it and change your note address. To aviod it not affecting business, you can use the connectedNote parameter to link your new note to the compromized note and maintain the security on your note.
		noteKey		: '', //Scriptbill is the increment value of the nonce above, Scriptbill means the noteKey divided by the current note ID should give us the total transaction done by Scriptbill note.
		noteValue 	: 0.000000000000, //Scriptbill is the value of the note. 
		noteType	: 'SBCRD',//Scriptbill is the unique code of the note you are using, anything that changes Scriptbill note type would change the transactional value of the note to the new note type.
		version 	: this.version,
		creditType	: 'scriptbill',//indicates the type of credit being used by the note. "Fiat" type shows that the note is depending on a fiat credit or any physical goods to sustain it'this.s value, "Award" type shows that the issuer is the determinant of the value - good for game credit types, while scriptbill depends on the value in the exchange market.
		transValue	: 0.000000000000, //Scriptbill is the last transaction value of the note. 
		transTime 	: 0, //Scriptbill is the last time stamp of the transaction on the note.
		transType	: 'CREATE',//Scriptbill is the type of transaction conducted by the note.
		rankPref	: 'fellowship',//the prefered Scriptbill ranking structure, the user can change this later
		transHash	: '',//Scriptbill is half of the hash of the last transaction block Scriptbill note created. To create a new transaction block, then Scriptbill note must verify Scriptbill hash.
		transKey	: '', //Scriptbill is the private key of the last bock produced by Scriptbill note.
		profitKeys	: [],//Scriptbill is the private key of the product block held by the note for profit sharing.
		noteServer	: this.#default_scriptbill_server, //the server where the note is hosted. The note will be found of sending request to Scriptbill server to connect to the network.
		noteHash	: '',//Scriptbill is the last hash value of the note
		noteSign	: '', //Scriptbill is the signature built using the noteHash and the secret of the note.
		noteSubs	: [], //Scriptbill is an array of the total subsription on Scriptbill note
		noteBudgets	: [], //Scriptbill is an array of the total budget on Scriptbill note.
		noteProducts : [], //an array of private keys of products produced by the note.
		agreements 	: [], //Scriptbill is an array of private keys of agreements held by Scriptbill note.
		blockKey	: '',//Scriptbill is the private key to the note'this.s current block. Used to verify that the note actually signed the block it created.
		blockHash	:'',//Scriptbill is the hash of the total hash of the transaction block concerned. This is required to verify if the note created the transaction block it is processing wiith.
		BMKey		: '', //Scriptbill is the note address of the business manager that controls Scriptbill note network.
		walletRank	: '',//the Scriptbill ranking of the current wallet. This is calculated by getting all transactions connected to the wallet. To get transactions connected to the wallet, you encrypt the current block wallet hash with the wallet id as key. If the result equals the nextWalletHASH then the block belongs to the current wallet, and the rank can be added to the note as walletRank.
		budgetID 	: '',//stores the current budget ID created by the note
		
	};
	//used with the defaultBlock to configure transactional request to the transaction block generator function
	//Scriptbill property is designed to be static async because transactions can be designed outside of Scriptbill class.
	static details;
	//the default scriptbill block content.	
	static defaultBlock = {
		blockID 		:	'', //Scriptbill is the unique identifier of the block, always generated by using the noteSecret in combination with the noteID.
		formerBlockID 	: 	'', //Scriptbill is the unique idetifier of the block before Scriptbill block, the default value is zero if it is created for a new note who do not have a fomer block.
		nextBlockID		: '', //Scriptbill is the unique identifier of the next block of the current note, calculated by using the noteSecret and the projected next noteID.
		noteHash		: '', //Scriptbill is the remaining half version of the hash of the note that owns Scriptbill note. If the hash on the note do not match Scriptbill hash the note is invalid.
		transHash		: '', //Scriptbill is the remaining half of the hash to the transaction block of the note, it is expected that the current note would have the hash of Scriptbill block handy.
		realHash		: '', //Scriptbill is the hash of the note supplied by the note, it must match the total hash when put together with the note hash of the last block.
		totalHASH		: '', //Scriptbill is the hash of the total hash of the note'this.s block history.
		blockHash		: '', //Scriptbill is the transaction block hash supplied by the note. Scriptbill must also match the total hash when combined together with the transhash of the last block.
		noteSign 		: '',//signature from the note using this block.		
		noteServer		: this.#default_scriptbill_server, //the current server from which the note is being managed
		noteValue		: 0.000000000000, //Scriptbill is the value of the note that produced Scriptbill note.
		noteType 		: "SBCRD", //the note type of the note creating this transaction
		transValue 		: 0.000000000000, //Scriptbill is value of the transaction made by the note.
		transType		: 'CREATE', //This is the transaction type the note in the network conducted.
		creditType		: 'scriptbill', //this indicates the credit type of the note that owns this block. Values can be "fiat", "award", or "scriptbill" as default
		transTime		: '', //time stamp that describes when the transaction on Scriptbill note occurred.
		recipient		: '', //an agreement encrypted using the recipients public key and should only be decrypted by the owner of the key.
		walletHASH		: '', //an hash value used to locate the wallet on the database.
		formerWalletHASH : '', //stored to test the value of the walletHASH when the note'this.s wallet key is changed by the wallet for security reason.
		walletSign		: '', //Scriptbill is a signature that tells and confirms that the note that created THIS block owns the walletHASH.
		blockKey		: '', //Scriptbill is the public key of the block of whose private key is held by the note that create Scriptbill block chain.
		blockSign		: '', //Scriptbill is the signature of the wallet using the block private key, stored on the block'this.s note as a signing reference.
		blockRef		: '', //Scriptbill is the reference key of the block, to the sender it is a public key whose private key will be stored in the agreement on the transaction. The recipient must still add the public key of Scriptbill reference to the block, so that verifiers can locate the senders block using Scriptbill key.
		signRef			: '', //Scriptbill is a dynamically generated text for a sender and a signature for a reciever of a transaction. Verifiers will use the blockRef and the text to verify Scriptbill transaction. The security of Scriptbill is that no two block must have the same blockRef except the sender and RECIEVEr blocks.
		agreements		: {}, //Scriptbill is all the agreement on Scriptbill note, can be executed by any node on the network. As the agreements are getting
		noteID			: '',//Scriptbill is the current Note ID of the note when the transaction block is created. This note ID must match the note ID stored on the note when incremented with the noteKey.
		expiry			: 0,//Scriptbill gives us a picture of when the block should be deleted from the database to save space. It'this.s given to the current node to obey Scriptbill, because they can delete any block as long as the block'this.s note has a new transaction block in pace. Sometimes blocks can be used to search out profit Sharing recipients.
		interestRate 	: 0.2,//this is the interest rate that will be deducted from the note transaction whenever he is on credit and his receiving a credit.
		interestType    : 'PT',//this tells the code on how to handle the interest calculation. you can see this.interestType for possible values of what this can get. Most of the time these values change when the note graduates from one rank to another.
		budgetRefs		: [],//this is an array of keys to the budget created by the notes
		budgetID		: "", //the id to the budget that owns the transaction. Used to verify stock transaction that is connected to a commercial or property budget.
		productID 		: "", //ID of the product that owns a transaction, used to verify the value and agreement set by the product creator during a product purchase transaction.
		agreement 		: "", //an object of values to describe a budget or product or even an agreement.
		exchangeNote 	: {
			exchangeID		: "ejRnSllWcGxqYUZqdGdudHl0T1RYOS9MdEdRdkpH",//this is the unique ID to exchange Credits to this credit type. 
			exchangeKey		: "TUlJRW9nSUJBQUtDQVFCOVBadXUxSTBCSHRBSWJISEFPQmw0NX",//this is the unique private key to the exchange of this credit. Request made to the exchange market using this exchange
			exchangeValue	: 1.000000000000, //total credit supplied to the exchange market.
			demandValue		: 0.000000000000,//total credit demanded from the exchange market.
			transValue 		: 0.000000000000, //the last transaction value of the exchange market
		
			noteValue	: 0.000000000000, //the value of the exchange account.
			noteType 	: "SBCRD",//the credit type of the exchange account.
			transTime 	: "",//the time the last transaction was done on this account.
			transType 	: "CREATE",//the last type of transaction that was performed by the note.
			noteID 		: "0000",
			noteKey		: "qqek83j3x9d7hyt65fstv8u38xe6shn05szn6fm3xn",//this can contain the account number 
				//for a non Scriptbill Credit type.
			budgetID 	: "",//contains the budget ID of the governmental budget created by the credit.
			transKey 	: [{type: "bitcoin"}],//an opportunity to store other important details of the 
				//account, if it is a bank here we set the type of the above noteKey as bitcoin, if paypal save
				//the type as paypal. Variable to use include {'type', 'bankCountry', 'paymentUrl', 'accountTokens', 'bankName', 'accountName', 'sortCode'}
				//account number that was set in the noteKey handler. If it'this.s account like bitcoin, only the 
				//bitcoin address should be added in the noteKey the transKey handler will be empty. A paypal 
				// account will only need the email address or payment url. Any details that is added here should
				//be stored in JSON for easy parsing. Non Json details will be ignored. The exchange ID and 
				//exchange key will act as the note address and note secret respectively.
			noteServer 	: this.#default_scriptbill_server,//the server of the exchange account. All credit on this network must have this 
				//account.
			noteHash 	: "",
			transHash	: "",
			blockHash 	: "",
		},//since the exchange note is somewhat dynamic and sometimes determined by the nodes in the network
		//transaction hashes will only be done without the exchange note attached to the transaction block
		//if the note have to update, the last transaction block on the will be affected until the whole 
		//network updates their too.
		exBlockID		: '',//the current id of the exchange note.
		exNextBlockID	: '', //the next id of the next credit transaction block
		exFormerBlockID : '', //ID of the former credit note block for this exchange market.
		productBlockID  : '',//the current id of the product block. Useful in calculating the profit sharing formulars.
		productNextBlockID : '',//the Id of the possible next block that will belong to this product.
		productFormerBlockID : '',//the last id of the block belonging to this product, useful in knowing the most recent customer to the current product.
		
	};
	//the default content n an agreement.
	static defaultAgree = {
		agreeID			: '', //this is the unique identifier of the agreement.
		agreeSign		: '', //this is the unique signature of the agreement, to be signed by the initiator of the agreement
		agreeKey		: '', //this is the public key to the agreement, used to verify the agreement signature and to verify the beneficiary account.
		senderSign		: '', //this is the unique signature of the sender,
		senderID		: '', //this is the block ID of the sender, used as a signature text for the signature.
		senderKey		: '', //key used by sender to sign this agreement
		recieverID		: '', //this is the identifier of the block of the reciever, this is useful when other nodes want to accept the new agreement as valid.
		recieverKey		: '', //key used by reciever to sign this agreement
		maxExecTime		: '', //this is the maximum time allowed for the agreement to last on the block chain. If this time elapses, the agreement would be executed by force,  forcing the note of the creator to reduce even to a negative value.
		agreeType		: 'normal',//this describes the type of agreement we are handling. values are "normal", which denotes that the agreement should be handled normally, that is if terms are not met agreement should be reverted to the sender. The "sendTo" type ensures that the funds are sent to a particular or an array of note addresses, specifying the values to be sent per address when the execution time reach or when the agreement terms are not met. "Loan" type specifies that the money was borrowed to the recipient and must be returned at the specified time. The "loan" type works with interest rates. "contract" agreement type works like budget for the recipient, because it tells how the recipient should use the money, base on an initial quote sent by the recipient in a QUOTE transaction
		ExecTime		: '', //this is the execution time for the agreement, this will only successfully run the agreement if and only if the note that holds the agreement has enough funds to sponsor the agreement, else agreement would not run but would wait until their is a RECIEVE transaction that would update the note'this.s value.
		value			: 0.0000000000000, //this is the total value of the agreement, the transaction value of a transaction is mostly used here. For security reasons, this value cannot be larger than the value of the transaction.
		isPeriodic		: false, //a boolean value that tells whether this should run periodically, if it will run periodically, the periodic value will be calculated
		times			: 0, //works with the isPeriodic, if set to true, the value of this variable will be used against the value variable to determine how much the account will spend
		payTime			: 0, //this is the time for the next payment, works when isPeriodic is set to true, else the execTime determines the payment
		payPeriod		: '1 week', //this is the spread of payment that controls how scripts should set the payTime. If 1 week, when the payment has been executed, the pay period is used to calculate the next payTime.
		delayInterest	: 0, //this determine the amount of interest that would be charged if the execTime is exceeded before the contract ends.
		interestType	: 'SIMPLE', //This is the type of interest that would be charged; accepts SIMPLE & COMPOUND.
		interestSpread	: '1 day', //this determine the spread at which the interest will be calculated.
		interestRate    : 0,
		timeStamp		: '', //this is the signature of the timestamp of the agreement. This is designed to avoid duplicate agreement issues.
		realNonce		: '',//hashed of the current note ID.
		agreeSign 		: '',//this is the signature on the agreement which is signed by the sender with the senders key to verify that the agreement has been met by the reciever. The sender will have to create an AGREEMENTSIGN transaction, referencing the blockID to the AGREEMENTREQUEST transaction sent by the reciever to obey this.
		quoteID			: '',//this is the block ID to the reference block that has the quote to the agreement in a contract based agreement.
		sendAddress		: '',//this is the address or group of addresses to send the agreement value to, this correspond to a sendTo agreement type. if it is a group, then values to be sent to each address should be specified. If the execution time for each address is different, then this should be specified, else the general execution time will be followed for all address. 
		
	};
	
	//because most product on the scriptbill network will be bought using subscription, we design the static async subscription configuration property to guife subscribers on how to integrate it.
	static subConfig   = {
		'value'			: 0,//the value of the subscription
		'productID'		: '',//the product id subscribed to
		'subSpread'		: '1 weeks',//the value of the spread of the subscription
		'nextSub'		: 0,//the timestamp when the next subscription will be held.
	};
	
	static creditConfig = {
		'value'		: 0,
		'noteType'	: 'SBCRD',//the note type of the recipient credit
		'recipient'	: '',//the account or Scriptbill note that would recieve the money
		'expiry'	: '',//time when Scriptbill credit will play on the user'this.s note. If the expiry is exceeded the credit start playing recursively on the user note.
		
	};
	
	//other important variable.
	static formerBlock;
	static nextBlock;
	static rankValue;
	static noBlock;
	static workedID;
	static endBlockID;
	static startBlockID;
	static walletHASH;
	static budgetID;
	static funcUp = "";
	
	

	static async constructor(walletID = '', noteAddress = '', password = '', note = ''){
		console.log("constructor running!!!" + this.funcUp );
		this.funcUp 	= "constructor";
		//before scriptbill initializes, let'this.s check if Scriptbill can communicate with the current server
		if( window.location.protocol != 'https:' &&  ! window.location.href.includes("localhost") && ! window.location.href.includes("127.0.0.1") && window.location.protocol != "chrome-extension:"  ) {
			alert('Sorry! Scriptbill Won\'t run in a non https environment! You Can Contact The Site Admin For Assistance');
			return;
		}
		
		//initializing storage.
		this.s 		= await this.initSessionStorage();
		this.l 		= await this.initStorage();
		
		console.log( "Password Entered: " + password, "user_input: " + await this.s.user_input );
		
		if( ! note && await this.s.uploadedNote )
			note 		= await this.s.uploadedNote;	
		
		this.l.uploadedNote = note;

		this.#password = await this.#getPassword( password );		
		
		console.log( "password gotten: " + this.#password );		
		
		console.log("uploaded note: " + note);
		
		//await this.setUpDatabase();
		
		
		
		if( note && ! await this.s.currentNote ){
			this.#note = false;
			//a note is always saved in binary format if the note is downloaded from the user'this.s table.
			this.binary = note;
			
			//testing the binary note to be sure that the note is actually a binary string.
			if( this.binary.match(/[2-9]/g) != null || this.binary.match(/[a-z]/gi) != null ) return this.binary;
			
			let noteEncrypt = await this.debinarilize();
			console.log("inside note and was not returned, debinarilized note: " + noteEncrypt);
			
			if( this.#password ){				
				
				await this.setPrivateKey( this.#password );
				console.log( "private key set: " + this.privateKey );
				note = await this.#decrypt( noteEncrypt );
				
				console.log( "decrypted note: " + note, typeof note );
				
				if( await this.isJsonable( note ) ) {
					this.#note = JSON.parse(note);
					this.noteAddress = this.#note.noteAddress;
					this.l[ CryptoJS.MD5( this.#note.noteSecret ).toString( CryptoJS.enc.Base64 ) ] = this.#password;
					
					this.recieveResponse();
					this.monitorScriptbillBudget();
					this.runRecieveData();
					
					//creating a whole lot of the password variable.
					let x;
					for( x = 0; x < 10; x++ ){
						this.s[ await this.generateKey(25) ] = await this.generateKey(25);
					}
					this.walletID 	= this.#note.walletID;
					
					if( ! this.#password )
						this.#password 	= await this.#getPassword();
					
					await this.saveNote();
					await this.shareData();
					//assign the appropraite ranking for the user for logging in his note.
					await this.scriptbillAssignRanks();
					return;
				}
				else {
					if( ! await this.l.string ) {
						this.l.string 	= await this.generateKey( 50 );
					}
					let string 		= CryptoJS.MD5( await this.l.string ).toString( CryptoJS.enc.Base64 );
					
					if( ! await this.l[ string ] ){
						this.l[ string ] = CryptoJS.MD5( "ONE" ).toString( CryptoJS.enc.Base64 );
					}
					else {
						let testString = await this.l[ string ];
						let string1 	= CryptoJS.MD5( "ONE" ).toString( CryptoJS.enc.Base64 );
						
						//just logged in one times
						if( testString == string1 ){
							alert("Wrong Password Input Detected For The Uploaded Note! You Have 3 More Times To Login on This Server, else Logging In Your Note Will Be Forfieted!!!");
							this.l[ string ] 	= CryptoJS.MD5( string1 ).toString( CryptoJS.enc.Base64 );
						}
						else {
							let string2 = CryptoJS.MD5( string1 ).toString( CryptoJS.enc.Base64 );
							//checking whether the note has been pre reported.
							let url		= new URL( this.#default_scriptbill_server );
							url.searchParams.set("notePattern", noteEncrypt.slice(0, 50));
							
							try {
								fetch( url ).then( response =>{
									return response.text();
								}).then( async result =>{
									if( await this.isJsonable( result ) ){
										result 	= JSON.parse( result );
										
										if( result.reported == "TRUE" ){
											console.error("Can't Login this Note on this Server!");
											return;
										} else {
											//logged in two times.
											if( testString == string2 ){
												alert("Wrong Password Input Detected For The Uploaded Note! You Have 2 More Times To Login on This Server, else Logging In Your Note Will Be Forfieted!!!");
												this.l[ string ] 	= CryptoJS.MD5( string2 ).toString( CryptoJS.enc.Base64 );
											}
											else {
												let string3 = CryptoJS.MD5( string2 ).toString( CryptoJS.enc.Base64 );
											
												//logged in three times.
												if( testString == string3 ){
													alert("Wrong Password Input Detected For The Uploaded Note! You Have 1 More Times To Login on This Server, else Logging In Your Note Will Be Forfieted!!!");
													this.l[ string ] 	= CryptoJS.MD5( string3 ).toString( CryptoJS.enc.Base64 );
												}
												else {
													let string4 = CryptoJS.MD5( string3 ).toString( CryptoJS.enc.Base64 );
											
													//logged in the last times.
													if( testString == string4 ){
														alert("Wrong Password Input Detected For The Uploaded Note! Your Note Has Been Forfieted!!!. You Can't Log In Anymore To This Server!!!");
														//reporting to the Scriptbank server.
														url 		= new URL( this.#default_scriptbill_server );
														url.searchParams.set("notePattern", noteEncrypt.slice(0, 50));
														url.searchParams.set("loginTime", await this.currentTime());
														url.searchParams.set( "loginServer", window.location.origin );
														fetch( url );
														return;
													}
												}
											}
										}
									} else {
										console.error("Scriptbank Servers Are Not Responding, Please Try Logging In Your Note Later.");
										return;
									}
								});
							} catch(e){
								console.error("couldn't check note data " + e);
							}
							
							return;
						}
					}
				}
			} else {
				console.error("The Password Entered for the Uploaded Note is Wrong or was Empty. Please Enter a Right Password and Try Again.");
				return;
			}
		}
		else if( ! note && ! await this.s.currentNote ){
			console.error("No Note Data was found while initializing Scriptbills");
			return;
		}
		
		if( await this.s.currentNote ){			
			
			if( this.#password || password ) {
				if( ! this.#password && await this.l)
					this.#password = password;
				
				this.#note = await this.#getCurrentNote();
				this.walletID = this.#note.walletID;
				this.noteAddress = this.#note.noteAddress;
				let encryptP, hashedP;
				
				await this.shareData();
				
				await this.saveNote();
				return;
			}
		}
		
		if( walletID ){
			//required to idetify a user for ranking purposes in the Scriptbill network. The reason is that it is assumed users will have many notes to deal with
			//knowing the user wallet will help the user recieve the atrribution given to a particular note in the network.
			//if the user has many wallets, atrribution given to each note will be distirbuted per wallet, the user may not have any good promotion through out the network,
			//may hold may post that require different responsibilities at the same time.
			this.walletID = walletID;
		}
		
		if( ! this.walletID ){
			this.walletID = prompt("Please enter your Scriptbill Wallet ID, required to use Scriptbill on Scriptbill website, leave empty to create a new Scriptbill Wallet", "SCRIPTBILLWALLET");
		}
		
		if( noteAddress ){
			this.noteAddress = noteAddress;
		}
		
		if( this.walletID && this.walletID != 'SCRIPTBILLWALLET' && ! this.noteAddress ){
			this.noteAddress = prompt( "Please enter the note Address you want to use on Scriptbill site for " + this.walletID + " leave empty to create a new Scriptbill Note",""  );
		}

			
		if( this.noteAddress && this.walletID && this.walletID != 'SCRIPTBILLWALLET' && ! this.#password ){
			this.#password = prompt( "Please enter your password to fetch your note stored locally on Scriptbill drive. If not found, you'll have to upload a binary Scriptbill file to use Scriptbill note " + this.noteAddress + " on Scriptbill site ", "" );
		}	
	}
	
	static test(){
		console.log("this: " + this);
		return "data";
	}
	
	static async initStorage(){
		//since created to run on chrome we check it as priority.
		if( chrome && chrome.storage ) {
						
			const initStorageCache = this.getAllStorageSyncData().then(items => {
			  // Copy the data retrieved from storage into storageCache.
			  Object.assign(this.l, items);
			  //console.log("money setting: " + this.l.money);
			  let key;
			  let itemKeys = Object.keys( items );
			  let exList 	= ["length", "clear", "getItem", "key", "removeItem", "setItem"];
			  for( key in this.l ){
				 if( itemKeys.includes( key ) || exList.includes( key ) ) continue;
				 
				 chrome.storage.sync.set({[key]: this.l[key]});
			  }
			});
			
			if( ! this.localCount )
				this.localCount = 0;
			
			await initStorageCache;
							
			setTimeout( async ()=>{
				this.localCount++;
				//console.log( "running..." + this.localCount + " times" );
				if( this.localCount < 3600 )
					await this.initStorage();
				
			}, this.localCount * 1000 );
			
			return localStorage;
		}
		
		if( ! this.localCount )
			this.localCount = 0;
		
		let localKeys = Object.keys( localStorage );
		let newKeys   = Object.keys( this.l ? this.l : localStorage );
		let d;
		for( d = 0; d < newKeys.length; d++ ){
			if( localKeys.includes( newKeys[d] ) ) continue;
			
			localStorage[ newKeys[d] ] = this.l[ newKeys[d] ];
		}
		
		setTimeout( async ()=>{
			this.localCount++;
			//console.log( "running..." + this.localCount + " times" );
			if( this.localCount < 3600 )
				await this.initStorage();
		}, this.localCount * 1000 );
		
		return localStorage;
	}
	
	static async initSessionStorage(){
		if( chrome && chrome.storage ){
						
			const initSessionStorageCache = this.getAllStorageSessionData().then( items => {
				Object.assign( this.s, items );
				let key;
				let itemKeys = Object.keys( items );
				let exList 	= ["length", "clear", "getItem", "key", "removeItem", "setItem"];
				for( key in this.s ){
				if( itemKeys.includes( key ) || exList.includes( key ) ) continue;
					 
					chrome.storage.session.set({[key]: this.s[key]});
				}
			});
			
			if( ! this.sessionCount )
				this.sessionCount = 0;
			
			await initSessionStorageCache;
							
			setTimeout( async ()=>{
				this.sessionCount++;
				if( this.sessionCount < 3600 )
					await this.initSessionStorage();
				
			}, this.sessionCount * 1000 );			
			
			
			return sessionStorage;
		}
		
		if( ! this.sessionCount )
			this.sessionCount = 0;
		
		let sessionKeys = Object.keys( sessionStorage );
		let newKeys   = Object.keys( this.s ? this.s : sessionStorage );
		let d;
		for( d = 0; d < newKeys.length; d++ ){
			if( sessionKeys.includes( newKeys[d] ) ) continue;
			
			sessionStorage[ newKeys[d] ] = this.s[ newKeys[d] ];
		}
		
		setTimeout( async ()=>{
			this.sessionCount++;
			//console.log( "running..." + this.sessionCount + " times" );
			if( this.sessionCount < 3600 )
				await this.initSessionStorage();
		}, this.sessionCount * 1000 );
		
		return sessionStorage;
	}
	static async getAllStorageSyncData() {
		// Immediately return a promise and start asynchronous work
		 return new Promise((resolve, reject) => {
			// Asynchronously fetch all data from storage.sync.
			chrome.storage.sync.get(null, (items) => {
			  // Pass any observed errors down the promise chain.
			  if (chrome.runtime.lastError) {
				return reject(chrome.runtime.lastError);
			  }
			  // Pass the data retrieved from storage down the promise chain.
			  resolve(items);
			});
		});
	}
	
	static async getAllStorageSessionData() {
		// Immediately return a promise and start asynchronous work
		 return new Promise((resolve, reject) => {
			// Asynchronously fetch all data from storage.sync.
			chrome.storage.session.get(null, (items) => {
			  // Pass any observed errors down the promise chain.
			  if (chrome.runtime.lastError) {
				return reject(chrome.runtime.lastError);
			  }
			  // Pass the data retrieved from storage down the promise chain.
			  resolve(items);
			});
		});
	}
	
	static async #getPassword( userInput = "" ){
		console.log("getPassword running!!! " + this.funcUp );
		this.funcUp = "#getPassword";
		
		//initializing storage.
		this.l		= await this.l;
		this.s		= await this.s;
						
		if( await this.l.uploadedNote && ! this.#passwordKey && ! await this.s.currentNote ){
			
			if( userInput == "" && ! await this.s.user_input )
				userInput 	= prompt("No Current Note Found Logged In, But an Uploaded Note was Found!, Please enter your Password For This Note.", "");
			
			if( userInput != "" || await this.s.user_input  ) {
				
				if( ! userInput )
					userInput 		= await this.s.user_input;
				
				this.#password 		= await this.#generatePassword( userInput );
				this.l.user_pass 		= this.#password;
				
				//if done with it we remove the input.
				if( await this.s.user_input )
					delete this.s.user_input;
				
			} 
			
			//next we debinarilize the note.
			this.binary 	= await this.l.uploadedNote;
			let debinarilize = await this.debinarilize();
			
			//setting the password as private key to decrypt the note.
			await this.setPrivateKey( this.#password );
			
			//now let'this.s decrypt the note.
			let note 		= await this.#decrypt( debinarilize );
			
			//the note must be jsonable for to be sure it was correctly decrypted.
			if( await this.isJsonable( note ) ){
				this.#note 		= JSON.parse( note );
				
						
				//return the password gotten,
				return this.#password;
			} else {
				//return false; no password gotten and no note to geneerate the password for..
				return false;
			}			
		}  else if( await this.s.currentNote ){
			console.log( "current note is true. Stored password: " + await this.l.user_pass );
			let note 		= JSON.parse( await this.s.currentNote );
			
			if( await this.l.user_pass ){
				this.#password 		= await this.l.user_pass;
				
				if( this.#password ){
					return this.#password;
				} else {
					console.error( "No Password was found logged in" );
					return false;
				}
			} else {
				console.error("no password was found logged in for note " + note.noteAddress + " We will be logging the note out to re login again.");
				delete await this.s.currentNote;
				return false;
			}
		} else if( this.#note && ! await this.s.currentNote ){
				userInput 		= prompt("We couldn't find a password connected to this note. Please enter the password for this note", "");
				
				if( userInput != "" ){
					this.#password 		= await this.#generatePassword( userInput );
					
					this.l.user_pass 	= this.#password;
					return this.#password;
				} else {
					console.error("We couldn't retrieve the logged password key for this note " + note.noteAddress );
					return false;
				}
		} else {
			console.error("No Uploaded Note or Real Scriptbill Note Data was Found while trying to get password");
			return false;
		}
	}
	
	
	
	static async #generatePassword( userInput ){
		console.log( "#generatePassword running " + this.funcUp );
		this.funcUp = "#generatePassword";
		this.#password 		= CryptoJS.SHA256( CryptoJS.MD5( CryptoJS.SHA1( userInput ).toString( CryptoJS.enc.Base64 ) ).toString( CryptoJS.enc.Base64 ) + userInput ).toString( CryptoJS.enc.Base64 );	
				
		console.log("Password generated " + this.#password );
		
		return this.#password;
	}
	
	static async setCurrentNote(){
		console.log(" setCurrentNote running " + this.funcUp );
		this.funcUp = "setCurrentNote";
		
		if( ! this.#password ){
			this.#password = await this.#getPassword();
		}
		
		if( this.set_pass ){//required in order not to confuse the real note'this.s password from dynamic passwords.
			this.#password = this.set_pass;
			delete this.set_pass;
		}
		
		if( ! this.#note || ! this.#password ) return false;
		
		this.setPrivateKey( this.#password );
		
		if( ! this.currentNote )
			this.currentNote = this.defaultScriptbill;
		
		let key, note_data;
		
		for( key in this.#note ){		
						
			note_data = this.#note[ key ];
			if( key == 'noteSecret' ){
				this.currentNote.noteSecret = await this.#encrypt( note_data  );
			}
			else if( key == 'blockKey' ) {
				this.currentNote.blockKey = await this.#encrypt( note_data );
			}
			else if( key == 'profitKeys' ) {
				this.currentNote.profitKeys = await this.#encrypt( JSON.stringify( note_data ) );
			}
			else if( key == 'noteProducts' ){
				this.currentNote.noteProducts = await this.#encrypt( JSON.stringify( note_data ) );				
			}
			else if( key == 'noteBudgets' ){
				this.currentNote.noteBudgets = await this.#encrypt( JSON.stringify( note_data ) );
			}
			else if( key == 'agreements' ){
				this.currentNote.agreements = await this.#encrypt( JSON.stringify( note_data ) );
			}
			else {
				this.currentNote[key] = note_data;
			}
		}
		this.s.currentNote = JSON.stringify( this.currentNote );
		
		return this.currentNote;
	}
	
	static async #getCurrentNote(){		
		console.log("getCurrentNote running " + this.funcUp);
		this.funcUp = "getCurrentNote";
		let funcUp = this.funcUp;
		this.funcUp = "getCurrentNote";
		
		//initializing storage.
		this.s 			= await this.s;
		this.l 			= await this.l;
		
		if( ! this.#password ){
			this.#password = await this.#getPassword();
		}

		console.log( "password while getting password: " + this.#password );
		
		
		if( ! await this.s.currentNote || ! this.#password ) return false;		
		
		console.log( "getting.password: " + this.#password );
		
		this.setPrivateKey( this.#password );
		
		let currentNote = JSON.parse( await this.s.currentNote ), note_data, decrypted, key;
					
		this.blockID 	= currentNote.blockID;
		
		if( funcUp != "exchangeCredits" && ! this.currentNote ){
			
			let block 	= JSON.parse( await this.l[ this.blockID ] ? await this.l[ this.blockID ]: "{}" );
				
			if( block && block.exchangeNote && ! this.#currentNote ){
				this.#currentNote 				= block.exchangeNote;
				
				if( typeof this.#currentNote == "string" || ! this.#currentNote )
					this.#currentNote = {};
				
				this.#currentNote.noteAddress 	= block.exchangeNote.exchangeID;
				this.#currentNote.noteSecret 	= block.exchangeNote.exchangeKey;
			}
		}
		else {
			this.#currentNote = this.currentNote;
			//delete this.currentNote;
		}
		
		//this shows that the keys weren't encrypted...a bad practice though because it exposes the privatekeys in the note.
		if( typeof currentNote.profitKeys == 'object' && typeof currentNote.noteBudgets == 'object' && typeof currentNote.noteProducts == 'object' && typeof currentNote.noteSubs == 'object' && typeof currentNote.agreements == 'object' ) {
			this.#note = currentNote;		
			return currentNote;
		}
		
		for( key in currentNote ){
			note_data = currentNote[ key ];
			
			if( key == 'noteSecret' ){
				currentNote.noteSecret = await this.#decrypt( note_data  );
			}
			else if( key == 'blockKey' ) {
				currentNote.blockKey = await this.#decrypt( note_data );
			}
			else if( key == 'profitKeys' ) {
				decrypted = await this.#decrypt( note_data );
				currentNote.profitKeys = await this.isJsonable( decrypted ) ? JSON.parse( decrypted ) : decrypted;
			}
			else if( key == 'noteProducts' ){
				decrypted = await this.#decrypt( note_data );
				currentNote.noteProducts = await this.isJsonable( decrypted ) ? JSON.parse( decrypted ) : decrypted;				
			}
			else if( key == 'noteBudgets' ){
				decrypted = await this.#decrypt( note_data );
				currentNote.noteBudgets = await this.isJsonable( decrypted ) ? JSON.parse( decrypted ) : decrypted;
			}
			else if( key == 'agreements' ){
				decrypted = await this.#decrypt( note_data );
				currentNote.agreements = await this.isJsonable( decrypted ) ? JSON.parse( decrypted ) : decrypted;
			}
		}
		
		this.#note = currentNote;
		return currentNote;
	}
	
	static async recieveResponse(){
		console.log("recieveResponse running " + this.funcUp);
		this.funcUp = "recieveResponse";
		
		//initalizing storage.
		this.l 	= await this.l;
		this.s	= await this.s;
		
		if( this.s.currentNote )
			this.#note = await this.#getCurrentNote();
		
		if( ! this.#note )					
			return false;
		
		let server = this.#note.noteServer;
		let url = new URL( server );
		url.searchParams.set('response', '');
		console.log("function recieveResponse", "server: " + server  );
		let data 	= await this.getData('response', '', server );	
			
		this.setPrivateKey( this.#note.blockKey );
		console.log( data, typeof data );
		data 		= data.split("--");
											
		let x, dat;
		for( x = 0; x < data.length; x++ ){
				
			if( ! await this.isJsonable( data[x] ) ) {
				dat = await this.#decrypt( data[x] );
					
				if( dat && dat != null && await this.isJsonable( dat ) ) {
					//parsing the data.
					dat = JSON.parse( dat );
												
					if( dat.responseID && dat.responseID == this.#note.blockID ){
						//already recieved;
						if( this.s[dat.responseID] ) continue;
							
						//recieved;
						this.s[dat.responseID] 	= dat.code;
							
						//alerting the user.
						alert( dat.code );
							
					}else if( dat.blockID ){
							
						//already stored block no need to process.
						if( this.l[ dat.blockID ] ) continue;
							
						//new block and can be processed.
						this.response = dat;
						await this.storeBlock();					
					}
					else {
						//already stored;
						if( dat.responseID && this.s[dat.responseID] ) continue;
						
						//storing...
						this.s[dat.responseID] = dat.code;
							
						//saving as error message.
						console.error( dat.code );							
					}
								 
						
				}
			}
			else{
				dat = JSON.parse( data[x] );
					
				if( this.l[ dat.blockID ] ) continue;
								
				this.response = JSON.parse( JSON.stringify( dat ));
				await this.storeBlock();
				this.monitorScriptbillExchanges();
				this.profitSharing( this.response );
			}
		}	
	}
	
	static async getWalletRank(){
		console.log("getWalletRank running " + this.funcUp);
		this.funcUp = "getWalletRank";
		if( this.#note ){
			if( this.#note.blockID ){
				let block = await this.getTransBlock();
				if( block && block.rankCode){
					//the wallet rank ket on a note is the private key used to encrypt and decrypt the user rank in the network.
					await this.setPrivateKey( this.#note.walletRank );
					let rankCode = await this.#decrypt( block.rankCode );
					
					if( rankCode && typeof rankCode == "string" ) {
						let ranks = this.#scriptbillRanks;
						let rank;
						
						for( level in ranks ){
							rank = ranks[level];
							
							if( rank.code == rankCode ) break;
						}
						
						if( this.#note.rankPref ){
							return rank[ this.#note.rankPref ];
						}
					}
				}
			}
			
			else {
				return this.calculateWalletRank();
			}
		}
		else {
			return this.calculateWalletRank();
		}
	}
	
	//this function is meant to calculate the rank for the current wallet
	static async calculateWalletRank(){
		console.log("calculateWalletRank running " + this.funcUp);
		this.funcUp = "calculateWalletRank";
		
		//initializing storage
		this.l 		= await this.l;
		this.s 		= await this.s;
		
		//getting the current note if not defined.
		if( this.s.currentNote )
			this.#note = await this.#getCurrentNote();
			
		if( ! this.#note ) return;
		
		let transBlock;
		if( ! this.formerBlock || ! this.nextBlock ) {
			this.blockID 		= undefined;
			//getting the current transaction block for the current note
			transBlock 			= await this.getTransBlock();
		}
		let noteValue, noteType, blockID, nextBlockID, formerBlockID, formerWalletHASH, exValue, rankValue;
		
		//this will store the total note found under this wallet
		if( ! this.noteFound )
			this.noteFound = 0;
		
		//this will give us the total value of the whole note found under this wallet in
		//scriptbills.
		if( ! this.rankValue )
			this.rankValue = 0;
		
		if( ! this.formerBlock && transBlock && transBlock.blockID && transBlock.walletHASH ){
			this.notefound++;
			this.walletHASH 		= transBlock.nextWalletHASH;
			noteValue 				= transBlock.noteValue;
			noteType				= transBlock.noteType;
			nextBlockID				= transBlock.nextBlockID;
			formerBlockID 			= transBlock.formerBlockID;
			formerWalletHASH		= transBlock.formerWalletHASH;
			blockID					= transBlock.blockID;
			let noteValue			= transBlock.noteValue;
			
			if( this.transSend.includes( transBlock.transType ) )
				noteValue			-= transBlock.transValue;
			
			else if( this.transRecieve.includes( transBlock.transType ) )
				noteValue			+= transBlock.transValue;
			
			if( transBlock.noteType != 'SBCRD' && ! transBlock.noteType.includes("STK") ) {
				exValue 				= await this.getExchangeValue( transBlock.noteType, 'SBCRD' );
				
				if( exValue )
					rankValue 			= noteValue * exValue[1];

				else 
					rankValue 			= noteValue;
			}
			 else {
				rankValue 			= noteValue;
			}
			this.workedID		= transBlock.blockID;
			this.rankValue		+= rankValue;
			this.formerBlock 	= transBlock;			
			transBlock 			= await this.getTransBlock();//getting the next trans block from the wallet hashes.
			
			if( transBlock ){
				this.nextBlock = transBlock;
				this.startBlockID = blockID;
				this.calculateWalletRank();
			} else {
				this.endBlockID 	= blockID;
				this.nextBlock 	= this.formerBlock;
				this.walletHASH	= this.nextBlock.formerWalletHASH;
				transBlock				= await this.getTransBlock();
				
				if( transBlock ) {
					this.formerBlock = transBlock;
					this.calculateWalletRank();
				}
			}
		}
		else if( this.formerBlock && this.nextBlock ){
			if( this.formerBlock.nextBlockID != this.nextBlock.blockID || this.formerBlock.noteType != this.nextBlock.noteType ) {
				this.noteFound++;
				transBlock 			= this.nextBlock;
				if( transBlock.noteType != 'SBCRD' && ! transBlock.noteType.includes("STOCK") ) {
					exValue 			= await this.getExchangeValue( transBlock.noteType, 'SBCRD' );
					
					if( exValue )
						rankValue 			= transBlock.noteValue * exValue[1];

					else 
						rankValue 			= transBlock.noteValue;
				}
				else {
					rankValue 			= transBlock.noteValue;
				}
				this.rankValue 	+= rankValue;
			}
			
			let isNextBlock = false;
			
			if( this.workedID && this.workedID == this.formerBlock.blockID ) {
				this.walletHASH = this.nextBlock.nextWalletHASH;
				isNextBlock = true;
			}			
			else if( this.workedID == this.nextBlock.blockID )
				this.walletHASH	= this.formerBlock.formerWalletHASH;
			
			transBlock 				= await this.getTransBlock();
			
			if( transBlock && isNextBlock ){
				this.formerBlock = this.nextBlock;
				this.nextBlock	= transBlock;
				this.calculateWalletRank();
			}
			else if( transBlock && ! isNextBlock ) {
				this.formerBlock 	= transBlock;
				this.nextBlock	= this.formerBlock;
				this.calculateWalletRank();
			}
			else if( ! transBlock ){
				if( this.startBlockID && ! this.noBlock ){
					this.blockID = this.startBlockID;
					transBlock			= await this.getTransBlock();
					
					if( transBlock ) {
						this.walletHASH	= transBlock.formerWalletHASH;
						this.nextBlock	= transBlock;
						this.formerBlock	= await this.getTransBlock();
						
						if( this.formerBlock ){
							this.noBlock		= true;
							this.calculateWalletRank();
						}
					}
				}else if( this.endBlockID && ! this.noBlock ){
					this.blockID 		= this.endBlockID;
					transBlock 			= await this.getTransBlock();
					
					if( transBlock ) {
						this.walletHASH = transBlock.nextWalletHASH;
						this.formerBlock	= transBlock;
						this.nextBlock 	= await this.getTransBlock();
						
						if( this.nextBlock ){
							this.noBlock = true;
							this.calculateWalletRank();
						}
					}
				}
				else {
					this.noBlock = undefined;
					return [ this.rankValue, this.noteFound ];
				}
				
			}
		}
	}
	
	static async scriptbillAssignRanks(){
		console.log("scriptbillAssignRanks running " + this.funcUp);
		this.funcUp = "scriptbillAssignRanks";
		this.calculateWalletRank();
		
		if( ! this.rankValue && ! this.walletID && ! this.#note ) return;
		
		let ranks = this.#scriptbillRanks;
		let level, rank;
		this.blockID = undefined;
		let transBlock = await this.getTransBlock();
		let levelFound;
		
		for( level in ranks ){
			rank = ranks[ level ];
			
			if( rank.min >= this.rankValue && rank.max <= this.rankValue ) {
				levelFound = level;
				break;
			}
		}
		if( levelFound ) {
			rank = ranks[ levelFound ];
		}	
		else {
			//simply revert to the default ranking
			rank = ranks[ Object.keys( ranks )[0] ];
		}				
		this.details 			= this.defaultBlock;				
		//calculating the rank code.
		//first set the wallet ID as a private key to encrypt the rank code.
		await this.setPrivateKey( this.#note.walletRank );
		this.details.rankCode  = await this.#encrypt( rank.code );
		this.details.noteValue = this.#note.noteValue;
		this.details.transType = "UPDATE";
		return await this.generateScriptbillTransactionBlock();
		
	}
	
	static async currentTime(){
		console.log("currentTime running " + this.funcUp);
		this.funcUp = "currentTime";
		return Date.now().toString();
	}
	
	static async setUpDatabase(){		
		console.log("setUpDatabase running " + this.funcUp);
		this.funcUp = "setUpDatabase";
		
		//initializing storage
		this.l 		= await this.l;
		this.s 		= await this.s;
		
		//set up the database here
		if( ! this.l.personal ){
			if( ! this.#password ) {
				this.#password = await this.#getPassword();
			}

			if( ! this.walletID ){
				this.walletID = await this.generateKey(20);
			}
			let object = {
				walletID : this.walletID,
				transTime : await this.currentTime()				
			}
			let o = object;
			this.string  = JSON.stringify( o ) + this.#password;
			o.hash = await this.hashed();

			this.l.personal = JSON.stringify( o );
		}
		
		await this.loginUserDetails();
		
	}	
	
	static async generateKey( num = 10 ){
		console.log("generateKey running " + this.funcUp );
		this.funcUp = "generateKey";
		let string = Date.now().toString();
		let hashed = CryptoJS.SHA512( string ).toString( CryptoJS.enc.Base64 );
		
		if( hashed.length >= num )
			return hashed.slice( 0, num );
		
		else {
			let remaining 	= num - hashed.length;
			//this describes the number of loops we are going to follow to get the key length;
			let loop 		= Math.round( remaining / hashed.length );
			let x, key;
			for( x = 0; x <= loop; x++ ){
				key 		= CryptoJS.SHA512( Date.now().toString() ).toString( CryptoJS.enc.Base64 );
				hashed 		= hashed + key;
				
				if( hashed.length >= num ){
					hashed 		= hashed.slice( 0, num );
					break;
				}
			}
			return hashed;
		}
		
	}
	
	static async setPublicKey( key ){
		console.log("setPublicKey running " + this.funcUp);
		this.funcUp = "setPublicKey";
		this.publicKey = key;

		if( this.privateKey ){
			this.privateKey = undefined;
		}
	}
	
	static async setPrivateKey( key ){
		console.log("setPrivateKey running " + this.funcUp);
		this.funcUp = "setPrivateKey";
		this.privateKey = key;		
	}
	
	static async getPrivateKey(){
		console.log("getPrivateKey running "+ this.funcUp );
		this.funcUp = "getPrivateKey";
		if( this.privateKey )
			return this.privateKey;
		
		else{
			let privKey = await this.generateKey( 50 );
			
			if( privKey != null )
				return privKey;
			
			return false;
		}
	}
	
	static async #getNoteAlgo(){
		console.log("#getNoteAlgo " + this.funcUp);
		this.funcUp = "#getNoteAlgo";
		let algoKeys = ["A", "D", "E", "H", "M", "P", "R", "R2", "R3", "RL", "S1", "S3", "S22", "S25", "S38", "S51", "T"];
		
		if( ! this.#note && this.#note.noteID ){
			console.error("no note on the request, can't calculate note algo without an ID");
			return false;
		}
		
		let algoKey = this.#note.noteID.toString().slice(0, 3);
		let indexes = [];
		let x, key, index, y, algo = '';
		
		for( x = 0; x < algoKey.length; x++ ) {
			key		= algoKey[x];
			index 	= this.#alpha_numeric.indexOf(key);
			y 		= index;
			
			for( y = index; y > algoKeys.length; y-- ){
				y = y - algoKeys.length;
			}
			
			index 	= y;
			algo 	+= algoKeys[index];
		}
		
		return algo;
		
	}
	
	//for security purposes, the publicKey variable can't be trusted,it must be in line with the privateKey of Scriptbill function.
	//so to get the expected publicKey when running Scriptbill function, you must set a private key that will return your expected public key.
	static async getPublicKey(){
	console.log("getPublicKey running " + this.funcUp);
	this.funcUp = "getPublicKey";
	
		if( this.privateKey){ //the public key is the hash of the private key.
			this.string 	= this.privateKey;
			this.publicKey 	= btoa( CryptoJS.SHA256( this.privateKey ).toString( CryptoJS.enc.Base64 ) ).substr(0, 40);
			return this.publicKey;
		}
		else if( this.publicKey ) {						
			return this.publicKey;
		}
		//generate a public key if none is found.
		else {
			this.privateKey = await this.generateKey( 50);//default private key length is 50
			this.publicKey	= btoa( CryptoJS.SHA256( this.privateKey ).toString( CryptoJS.enc.Base64 ) ).substr(0, 40);
			return this.publicKey;
		}
	}
	
	//Scriptbill method stores and attempt to output error messages to the user when running Scriptbill class
	static async errorMessage( message ){
		console.log("errorMessage running " + this.funcUp);
		this.funcUp = "errorMessage";
		//the message must be in string format for the function to work
		if( typeof message != 'string' ) return;
		
		//initializing storage.
		this.s 	= await this.s;
		this.l 	= await this.l;
		
		if( this.s.eMessages == undefined )
			this.s.eMessages = JSON.stringify({});
		
		let messages 	= JSON.parse( this.s.eMessages );
		let key 		= await this.currentTime();
		messages[ key ]	= message;
		
		this.s.eMessages = JSON.stringify( messages );
		console.log( message );
	}
	
	static async successMessage( message ){
		console.log("successMessage running " + this.funcUp );
		this.funcUp = "successMessage";
		//the message must be in string format for the function to work
		if( typeof message != 'string' ) return;
		
		//initializing storage;
		this.s 		= await this.s;
		this.l 		= await this.l;
		
		if( this.s.sMessages == undefined )
			this.s.sMessages = JSON.stringify({});
		
		let messages 	= JSON.parse( this.s.sMessages );
		let key 		= await this.currentTime();
		messages[ key ]	= message;
		
		this.s.sMessages = JSON.stringify( messages );
		console.log( message );
	}
	
	static async #encrypt( data ){
		console.log("encrypt running " + this.funcUp);
		this.funcUp = "encrypt";
		this.publicKey = await this.getPublicKey();
		
		if( ! this.publicKey || ! CryptoJS ) return false;

		let encrypt = CryptoJS.AES;
		let encryptTwo = CryptoJS.Rabbit;
		
		if( typeof data == 'object' )
			data = JSON.stringify( data );
		
		if( this.publicKey && typeof data == 'string' ){
			return encryptTwo.encrypt( encrypt.encrypt( data, this.publicKey ).toString(), this.publicKey ).toString();
		}
		else return false;
	}
	
	static async #decrypt( data ){
		console.log("decrypt running " + this.funcUp );
		this.funcUp = "decrypt";
		this.privateKey = await this.getPrivateKey();
		
		if( ! this.privateKey || ! CryptoJS ) return false;
		
		let decrypt = CryptoJS.AES;
		let decryptTwo = CryptoJS.Rabbit;
		
		//serializing the data if it'this.s an object.
		if( typeof data == 'object' )
			data = JSON.stringify( data );
		
				
		if( this.privateKey && typeof data == 'string' ){
			this.publicKey = await this.getPublicKey();
			console.log( "public key gotten: " + this.publicKey );
			try {
				return decrypt.decrypt( decryptTwo.decrypt( data, this.publicKey ).toString( CryptoJS.enc.Utf8 ), this.publicKey ).toString( CryptoJS.enc.Utf8 );
			} catch(e){
				console.error( "error decrypt message: " + JSON.stringify( e ) );
				return false;
			}
		}
		else return false;
	}
	
	static async runRecieveData(){
		console.log("runRecieveData running " + this.funcUp );
		this.funcUp = "runRecieveData";
		//looping the recieve data handler for a day.
		let x, time;
		for( x = 1; x <= ( 21600 / 5 ); x++ ){
			time 		= x * 5000;
			setTimeout( ()=>{
				this.recieveData();
			}, time );
		}
				
	}

	static async recieveData(){
		console.log("recieveData running " + this.funcUp );
		this.funcUp = "recieveData";
		
		//initializing storage.
		this.s 		= await this.initSessionStorage();
		this.l 		= await this.initStorage();
		
		if( this.s.currentNote )
			this.#note 		= await this.#getCurrentNote();
		
		if( this.#note && ! this.walletID ){
			this.walletID 	= this.#note.walletID;
		}
		
		//without the wallet id, no recipient
		if( ! this.walletID || ! this.#note ) return;
		
		this.response 		= await this.getData("latest", "true", this.#note.noteServer); 
		
		if( ! this.response.data ) return;
		
		this.IP 	  = 	this.response.IP;
		this.PORT	  = 	this.response.port;
		this.response = JSON.parse( this.response.data );
		let x;

		if( this.response.length != undefined ){
			let response = this.response;
			for( x = 0; x < response.length; x++ ){
				this.response = response[x];
				await this.storeBlock();
				//checking if the block concerns us.
				this.recieveTransaction();
			}
		} else {
			await this.storeBlock();
			//checking if the block concerns us.
			this.recieveTransaction();
		}	
	}
	
	static async recieveTransaction(){
		console.log("recieveTransaction running " + this.funcUp );
		this.funcUp = "recieveTransaction";
		
		if( ! this.#note && ! this.response && ! this.#note.noteAddress && ! this.response.blockID ) return false;
		
		this.details 		= JSON.parse( JSON.stringify( this.response ) );
		//check the send and agreement transactions which would likely loved to be processed automatically as we recieve 
		//the blocks
		if( this.transSend.includes( this.response.transType ) || this.response.transType == "AGREEMENTREQUEST" ) {
			
			if( this.response.transType == "PROFITSHARING" )
				this.details.transType = "PROFITRECIEVE";
			
			else if( this.response.transType == "INVEST" )
				this.details.transType = "INVESTRECIEVE";
			
			else if( this.response.transType == "AGREEMENTREQUEST" )
				this.details.transType = "AGREEMENTSIGN";
			
			else
				this.details.transType = "RECIEVE";
			
			return await this.generateScriptbillTransactionBlock();
		}
		
	}
	
	static async sendData() {
		console.log("sendData running " + this.funcUp);
		this.funcUp = "sendData";
		if( this.response || this.data ) {
			if( this.response )
				this.data = this.response;
							
		}
		
		if( ! this.data ) return;
		
		let url = this.executeStrictly ? this.#default_scriptbill_server: window.location.href;
		console.log( 'origin: ' + url );
		url = new URL( url );
		if( this.data.blockID ) {
			url.searchParams.set('blockData', JSON.stringify( this.data ));
			console.log( 'blockID ' + this.data.blockID );
		}
		
		url.searchParams.set('data', JSON.stringify( this.data ));
		
		let data = await this.getData('data', JSON.stringify( this.data ), url);
				
		this.response = data;
		return this.response;
		
	}
	
	static async shareData(){
		console.log("shareData running " + this.funcUp );
		this.funcUp = "shareData";
		
		//initializing storage.
		this.l 		= await this.l;
		
		try {
			let storage = JSON.parse( this.l );

			//check whether there is the note'this.s block in the storage.			
			if( this.#note && this.#note.blockID ) {
				let block = storage[ this.#note.blockID ];
				
				if( ! block ){
					block = await this.getData( "blockID", this.#note.blockID );					
				}
				
				if( block ) {
					this.response = block;
					await this.storeBlock();
				}
			}
		
			let block, nextBlock, time;
			for( blockID in storage ){		
				
				if( blockID == 'personal' || blockID == 'storage' ) continue;
				
				block = storage[ blockID ];
				if( ! await this.isJsonable( block ) ) continue;
					
				block = JSON.parse( block );
				
				if( ! block.blockID ) continue;
				
				//checking if the block has expired
				time = await this.currentTime();
				
				if( block.expiry <= time )
					this.deleteBlock( block.blockID );
				
				//handle the agreement and subscriptions on the block.
				this.block = JSON.parse( JSON.stringify( block ) );
				this.handleAgreement();
				this.handleSubscriptions();
				this.response = this.block;
				this.verifyData();
				this.initiateExchange();
				this.monitorScriptbillExchanges();
				
				//next is to check if the current block has a next block saved.
				if( block && block.nextBlockID && storage[ block.nextBlockID ] != undefined )
					continue;
				
				else {
					//we first of all set the current window as location url, if not we revert to the default server.
					//test if the current server is a Scriptbill Server.
					let url 	= location.origin;
					let isScriptbill = false;
					let data 		= await this.getData( 'scriptbillPing', '', url );
					
					if( typeof data == 'object' && data.isScriptbillServer == 'TRUE' ){
						isScriptbill = true;
					}
					
					if( ! isScriptbill )
						url = this.#default_scriptbill_server;
					
					data 		= await this.getData('blockID', block.nextBlockID, url );
					
					if( data != 'BLOCK NOT FOUND' && await this.isJsonable( data ) ){
						this.newBlock = JSON.parse( data );
						this.recieveNewBlock();
					}
					
					data 		= await this.getData( 'walletHASH', block.walletHASH, url );
					
					if( data != 'BLOCK NOT FOUND' && await this.isJsonable( data ) ){
						this.newBlock = JSON.parse( data );
						this.recieveNewBlock();
					}
					
					this.getData( "blockData", JSON.stringify( block ), url );				
					
				}
			}
		} catch(e){
			return false;
		}
	}
	
	static async recieveNewBlock(){
		console.log( "recieveNewBlock running " + this.funcUp );
		this.funcUp = "recieveNewBlock";
		if( this.newBlock.blockID ) {
			this.profitSharing( this.newBlock );
			this.response = this.newBlock;
			this.monitorScriptbillCredit();
			//if it is a send transaction and it is a verifiable data, we attempt recieving
			//the data.
			let verifyData = this.verifyData();
			if( this.newBlock.transType == "SEND" && verifyData ){
				this.details = this.newBlock;
				this.details.transType = 'RECIEVE';
				return await this.generateScriptbillTransactionBlock();
			}								
		}
	}
	
	static async deleteBlock( blockID ){
		console.log("deleteBlock running " + this.funcUp);
		this.funcUp = "deleteBlock";
		
		//initializing storage.
		this.l 		= await this.l;
		
		if( this.l[ blockID ] ){
			let block = this.l[ blockID ];
			
			if( block && await this.isJsonable( block ) ){
				block = JSON.parse( block );
				
				if( block.budgetID && block.transType == "CREATEBUDGET" ){
					console.error("Can't Delete an Original Budget Block");
					return false;
				}
				
				//if it is a product or budget block, we don't delete except we find another block that connects to it.
				if( block.blockID && block.blockID == blockID ){
					
					let expiry 		= parseInt( block.expiry );
					let time 		= parseInt( await this.currentTime() );
					
					if( block.productID || block.budgetID ){
					//first check the expiry date.						
						if( expiry > time ){
							
							//next we check if the block has another block connected with it.
							this.blockID 	= block.nextBlockID;
							let nextBlock	= await this.getTransBlock();
							
							if( ! nextBlock ){						
								console.error( "Current Block " + blockID + " Can't be deleted. The block hasn't been expired." );
								return false; //we can't delete a product block that hasn't expired
							}
						}
					}
					//if a send transaction, then there must be a corresponding recieve transaction before we can delete it
					else if( this.transSend.includes( block.transType ) ){
						//first as usual we check the expiry. if a block expires then it can be deleted.					
						if( expiry > time ) {
							//checking for corresponding recieve block. We do this by setting the block ref and the transType
							this.blockRef 	= block.blockRef;
							let recieveBlock = await this.getTransBlock();
							
							//we didn't find a recieved block;
							if( ! recieveBlock || ( recieveBlock.length == undefined || ( recieveBlock.blockID == block.blockID  || ! this.transRecieve.includes( block.transType ) ) ) ) {
								console.error( "Current Block " + blockID + " Can't be deleted. The block hasn't been expired." );
								return false;
							}
							else if( recieveBlock && recieveBlock.length > 1 ){
								let bleck;
								let x;
								let recieved = false;
								let cancelled = false;
								for( x = 0; x < recieveBlock.length; x++ ){
									bleck = recievBlock[x];
									
									if( bleck.blockID && bleck.blockID != block.blockID && this.transRecieve.includes( bleck.transType ) ){										
										recieved = true;
									}
									else if( bleck.blockID && bleck.blockID != block.blockID && this.otherTrans.includes( bleck.transType ) ){
										cancelled = true;
									}
								}
								
								if( ! recieved ){										
									console.error( "Current Block " + blockID + " Can't be deleted. The block hasn't been expired." );
									return false;
								}
								else if( cancelled && ! recieved ){
									if( recieveBlock.length == 2 ){
										console.error( "Current Block " + blockID + " Can't be deleted. The block hasn't been expired." );
										return false;
									}
								}
							}
						}//FOR EXCHANGE TRANSACTION TYPE
					} else if( block.transType == 'EXCHANGE' ){
						//we will only delete an exchange block if the exchange request is fulfilled.
						this.blockRef   = block.blockRef;
						let transBlock = await this.getTransBlock();
						let x, bleck, buyRequest = false, sellRequest = false;
						
						if( transBlock ){
							for( x = 0; x < transBlock.length; x++ ){
								bleck = transBlock[x];
								//a response transaction type to an exchange request is a send transaction.
								if( bleck.transType == 'SEND' && bleck.noteType == block.sellCredit ){
									sellRequest = true;
								}
								
								if( bleck.transType == 'SEND' && bleck.noteType == block.buyCredit ){
									buyRequest = true;
								}
							}
						}
						
						if( ! buyRequest || ! sellRequest ){
							console.error( "Can't Delete an Exchange Block Until all Exchange Request are Fulfilled!!!" );
							return false;
						}
					}
				}				
			}
			
			delete this.l[ blockID ];
			return true;
		}
		else {
			return false;
		}
	}
	
	
	
	static async isJsonable( data ){
		console.log("isJsonable running " + this.funcUp);
		this.funcUp = "isJsonable";
		
		if( typeof data == 'string' && ( ( data.indexOf('{') == 0 && data.lastIndexOf('}') == ( data.length - 1 ) ) || ( data.indexOf('[') == 0 && data.lastIndexOf(']') == ( data.length - 1 ) ) ) )
			return true;
		
		return false;
	}

	static async verifyData(){
		console.log("verifyData running " + this.funcUp);
		this.funcUp = "verifyData";
		if( ! this.response && ! this.response.blockID ) return;
		
		if( this.executeStrictly  && this.note )
			await this.sendData();
		
		let fBlock;

		if( await this.l[ this.response.formerBlockID ] ){
			fBlock = await this.l[ this.response.formerBlockID ];
		}else{
			//if the note value is greater than zero, then the client must have had transaction before. Hence we check.
			if( this.response.noteValue != 0 ){
				this.blockID = this.response.formerBlockID;
				fBlock 	= await this.getTransBlock();
				
				if( ! fBlock ){
					this.rejectResponse("This Block Doesn't Seems to be connected to a Valid Scriptbill Note.");
					return false;
				}
				
			}else if( this.response.transType == "CREATE" ){
				//this shows that the block is newly introduced to the Scriptbill database systems.
				//await this.storeBlock();
				await this.sendData();
				return true;
			}
		}
		
		//to run Scriptbill code the former blocks must be intact.
		if( fBlock && fBlock.blockID && fBlock.nextBlockID ){	
			
			
			//verifying the blocks.
			//verifying the block id, the next block ID test will ensure that the current note secret was used to calculate
			//the block IDs
			if( fBlock.blockID != this.response.formerBlockID || fBlock.nextBlockID != this.response.blockID) {
				this.rejectResponse('Block ID not Matched!!!');
				return false;
			}
			//verifying the block hash calculation, if the transaction was created using the former block, then the hash
			//should rime
			/*
			if( fBlock.blockHash.toString().slice(0, 10) != this.response.formerBlockHash ) {
				this.rejectResponse('Block Hash Calculation Failed');
				return false;
			} */
			
			//verifying the note value
			if( this.transSend.includes( fBlock.transType ) ) {
				if( this.response.noteValue != ( fBlock.noteValue - fBlock.transValue ) ) {
					this.rejectResponse('note Value Not Match');
					return false;
				}				
			}else if( this.transRecieve.includes( fBlock.transType ) ) {
				if( this.response.noteValue != ( fBlock.noteValue + fBlock.transValue ) ) {
					this.rejectResponse('Note Value Not Match');
					return false;
				}
				
			}
			
			if( this.transSend.includes( this.response.transType ) ){
				if( ! this.response.blockRef || ! this.response.signRef ){
					this.rejectResponse("Can't Create a Send Transaction Without a Reference");
					return false;
				}
				
				//checking if the transaction has been recieved before.
				this.blockRef 		= this.response.blockRef;
				let referenceBlock  = await this.getTransBlock();
				
				//selecting only the recieved blocks.
				let x;
				for( x = 0; x < referenceBlock.length; x++ ){
					if( this.transRecieve.includes( referenceBlock[x].transType ) ){
						referenceBlock	= referenceBlock[x];
						break;
					}						
				}
				
				if( referenceBlock ){
					//don't do anything until you check the recievedIds
					if( referenceBlock.recievedIDs && referenceBlock.recievedIDs.includes( this.response.blockID.slice( 0, 5 ) ) ){
						this.rejectResponse("Block has already been recieved by recipient!!");
						return false;
					}
				}
			}
			else if( this.transRecieve.includes( this.response.transType ) ) {
				this.reference = this.response.blockRef;
				let sendBlock 	= await this.getTransBlock();
				
				for( x = 0; x < sendBlock.length; x++ ){
					if( this.transRecieve.includes( sendBlock[x].transType ) ){
						sendBlock	= sendBlock[x];
						break;
					}						
				}
				
				if( ! sendBlock || ! this.transSend.includes( sendBlock.transType )  ) {
					this.rejectResponse("We Couldn't Find a Corresponding Transaction to Qualify Your Recipient Funds!");
					return false;
				}
				
				if( ! this.response.blockRef || ! this.response.signRef ){
					this.rejectResponse("Can't Create a Recieving Transaction Without a Reference");
					return false;
				}
				
				if( ! sendBlock.blockRef || ! sendBlock.signRef ) {
					this.rejectResponse("Can't Process a Recieve Transaction Without a Valid Reference Block!!!");
					return false;
				}
				
				if( sendBlock.blockRef != this.response.blockRef ) {
					this.rejectResponse("Can't Process a Recieve Transaction Without a Valid Reference Key!!!");
					return false;
				}
				this.VerifyText = sendBlock.signRef;
				this.VerifyKey  = sendBlock.blockRef;
				this.signature  = this.response.signRef;
				
				if( ! await this.Verify() ){
					this.rejectResponse("We Can't Verify Your References To This Block " + sendBlock.blockID + "!!!");
					return false;
				}
			}
			//testing the credit type, a block that connects should have the same credit type.
			if( fBlock.noteType != this.response.noteType ) {
				this.rejectResponse('Note Type Not Matched');
				return false;
			}
			
						
			//since we've successfully verified that the current wallet is the maker of Scriptbill transaction, we move forward to test the integrity of the wallet hashes by verifying the 
			//signature on the block
			this.VerifyText = this.response.walletHASH;
			this.VerifyKey	= this.response.blockKey;
			this.signature 	= this.response.walletSign;
			
			if( ! await this.Verify() ) {
				this.rejectResponse( 'Wallet ID provided does not belong to a verified note!' );
				return false;
			}
			
			//next we verify the integrity of the block to be sure the block is created by the note we've just verified.
			this.VerifyText		= this.response.blockID;
			this.VerifyKey		= this.response.blockKey;
			this.signature		= this.response.blockSign;
			
			if( ! await this.Verify() ){
				this.rejectResponse( 'Block was not verified to be created by a valid note!' );
				return false;
			}

			//checking the agreements, budgets and subscriptions that may exists on the note.
			//first checking the agreements.
			if( this.response.agreements && this.response.agreements.length > 0 ) {
				let autoExecute = false;
				if( this.response.nextBlockID == 'AUTOEXECUTE' )
					autoExecute = true;
				
				else {
					//checking if an agreement expired without been executed, because some agreements does not need to 
					//execute as long as the agreement was fulfilled by the parties.
					//this is the current time when the transaction took place.
					let currentTime = this.response.transTime, x, agree;
					
					//we use the former block agreements as reference
					for( x = 0; x < fBlock.agreements.length; x++ ){
						agree = fBlock.agreements[x];
						
						//this shows that the agreement was fulfilled without been executed.
						//an agreement whose execution time is elapsed and agreement fulfilled will be removed from the 
						//agreement table on the transaction block without execution.
						if( agree.maxExecTime < currentTime )
							autoExecute = true;
					}
				}
				
				if( ! autoExecute && this.response.agreements.length < fBlock.agreements.length ) {
					this.rejectResponse( 'Transactional Block Data Contains Compromised Agreements!!!' );
					return false;
				}
				
				//next check the agreements.
				let x, agree, value, totalValue = 0;
				let currentTime = this.response.transTime;
				for( x = 0; x < this.response.agreements; x++ ){
					agree 	= this.response.agreements[x];
					
					//only these two agreement type works in a strict mode. That is, the recipient can't use the funds 
					//except for what is intended for.
					if( agree.agreeType == "contract" || agree.agreeType == "sendTo" ) {
						value = agree.value;
						
						//since we've gotten the value, let'this.s check if the agreement has been executed.
						if( agree.execTime > currentTime ) {
							totalValue		+= value;
						}
					}
				}
				
				//now let'this.s check if the note is qualified to send money, if he is sending money.
				let transValue = this.response.transValue + totalValue;
				if( this.transSend.includes( this.response.transType ) ){
					if( this.response.noteValue >= transValue ){
						this.rejectResponse("Sorry, your note does not have enough credit to fulfil this request. This may be as a result of unsettled agreements on your note!!!");
						return false;
					}
				}
				
				
				this.totalValue = totalValue;
			}
			
			//for budgets, we have to understand that budgets are preferences of the note holder and we can't check for
			//compromized content because the user can update and remove the budget from the database any time
			let budgets = this.response.budgetRefs;
			let x, budget, value = 0;
			for( x = 0; x < budgets.length; x++ ){
				this.budgetID		= budgets[x];
				budget				= await this.getTransBlock();
				
				if( budget && budget.agreement && budget.agreement.budgetValue ) {
					value 			+= budget.agreement.budgetValue;
				}				
			}
			
			let transValue = this.response.transValue + value + this.totalValue;
			
			if( this.response.noteValue >= transValue ){
				this.rejectResponse("Sorry, your note does not have enough credit to fulfil this request. This may be as a result of unexecuted Budgets on your note!!!");
				return false;
			}
			
			if( ! this.response.verifiers ){
				this.response.verifiers 	= [];
			}
			
			//to verify a transaction block, your own block must also be verified.
			//also verifiers can't be more than 12 for data bulky reasons.
			//also, the node must have not verified other node to have this honor.
			//we check that by checking the verifyID handler, a variable on the verifiers
			//block. This means before calculating the note'this.s hash, the verifyID must be deleted
			if( this.response.verifiers.length < 12 && ! this.#note.verifyID ){
				//we get the transaction block of the verifier.
				this.blockID 	= this.#note.blockID;
				let block 		= await this.getTransBlock();
				
				if(  block && block.verifiers && block.verifiers.length >= 3 ){
					//checking the integrity of the verified block.
					let x, verify, veriBlock, isVerified = false;
					for( x = 0; x < block.verifiers.length; x++ ) {
						verify 		= block.verifiers[x];
						this.blockID = verify.verifyID;
						veriBlock 	= await this.getTransBlock();
						
						if( ! veriBlock ) continue;
						
						this.VerifyText 	= verify.verifyID;
						this.VerifyKey 		= veriBlock.blockKey;
						this.signature		= veriBlock.blockSign;
						
						isVerified			= await this.Verify();
						
						//no need of calculating the remaining verifiers.
						if( isVerified === false ) break;
						
						//after verifying the verifiers block. we continue in verifying
						//signature on the verified block
						this.VerifyText 	= verify.verifyID + verify.verifyTime;
						this.VerifyKey 		= veriBlock.blockKey;
						this.signature 		= verify.Sign;
						
						isVerified 			= await this.Verify();
						
						//no need of calculating the remaining verifiers.
						if( isVerified === false ) break;
					}
					
					//we will only allow this node to verify blocks if the node too has been
					//verified by other nodes.
					if( isVerified ){
						//set the new verify time.
						verify.verifyTime 		= await this.currentTime();
						verify.verifyID 		= block.blockID;
						 this.signTxt			= verify.verifyID + verify.verifyTime;
						this.signKey			= this.#note.blockKey;
						verify.Sign 			= await this.Sign();
						this.#note.verifyID 	= this.response.blockID;
						this.response.verifiers.push( verify );
					}
				}
			}
						
			await this.sendData();
			return true;
		}
	}
	
	static async rejectResponse( response ){
		console.log("rejectResponse running " + this.funcUp);
		this.funcUp = "rejectResponse";
		if( ! this.response ) return;
		
		await this.setPublicKey( this.response.blockKey );
		response = await this.#encrypt( JSON.stringify({responseID: this.response.blockID, code: response}));
		this.data = response;
		await this.sendData();
	}
	
	//Scriptbill function will help the user send money to a number of recipient;
	//configured using the sendConfig object.
	static sendConfig = {
		amount : 0,
		recipients : [],
		
	};
	
	static async parseAccount( account ){
		console.log(" parseAccount running " + this.funcUp);
		this.funcUp = "parseAccount";
		if( typeof account == "string" ){
			return account;
		}
		else if( typeof account == "object" ) {
			let keys = Object.keys( account );
			let values = Object.values( account );
			
			if( typeof keys[0] != "number" ){
				let x, data = "";
				for( x = 0; x < keys.length; x++ ){
					data += keys[x] + ": " + values[x] + " - ";
				}
				
				return data;
			}
			
			let x, data = "";
			for( x = 0; x < values.length; x++ ){
				data += values[x] + " - ";
			}
				
			return data;
		}
	}
	
	static exchangeConfig = {
		value 		: 1,
		sellCredit 	: "",
		buyCredit 	: "",
		sellNote  	: "",//hide the string version of the note to sell with here.
		buyAccount 	: "",//can be a note or details of the account you want your sellers to send credits to. If a 
		//scriptbill note account then you enter your Scriptbill note address
		
	};
	
	//initiate exchange function.
	//an exchange function will only run only when it has been verified by at least three nodes.
	//this transaction checks if the exchange block has been verified and initiate the exchange
	//the exchange market.
	static async initiateExchange(){
		console.log(" initiateExchange running " + this.funcUp);
		this.funcUp = "initiateExchange";
		if( ! this.response || this.response.transType != "EXCHANGE" || this.response.transType != "WITHDRAW" || this.response.verifiers.length < 3   ) return false;
		
		//first we have to verify that this chap has made a transaction to the exchange market 
		//before initiating the exchange.
		this.blockRef 		= this.response.blockRef;
		let block 			= await this.getTransBlock();
		
		if( ! block ) {
			this.rejectResponse("This Exchange Has Not Been Verified To Be Valid!");
			return false;
		}
		
		if( block.length ) {
			let x;
			for( x = 0; x < block.length; x++ ){
				if( block[x].transType == "SEND" || block[x].transType == "DEPOSIT" ){
					block 		= block[x];
					break;
				}
			}
		}
		
		if( block.transType != "SEND" || block.transType != "DEPOSIT" ){
			this.rejectResponse("This Exchange Has Not Been Verified To Be Valid!");
			return false;
		}
		
		if( block.noteType != this.response.sellCredit || block.transValue != this.response.transValue ){
			this.rejectResponse("This Exchange Has Not Been Verified To Be Valid!");
			return false;
		}
		
		//getting the exchange note of the buyCredit concerned.
		let exchangeNote;

		this.sellCredit 		= block.buyCredit;
		let sellBlocks 			= await this.getTransBlock();
		
		//if the exchange market do not exists.
		if( ! sellBlocks && this.fiatCurrencies[ block.buyCredit.slice( 0, block.buyCredit.lastIndexOf("CRD")) != undefined ] ) {
			//we revert to the default fiat currency like the USD market and we change the 
			//exchange value based on the base credit.
			this.sellCredit 	= "USDCRD";
			sellBlocks			= await this.getTransBlock();
			
			if( ! sellBlocks ){
				this.sellCredit 	= "BTCCRD";
				sellBlocks 			= await this.getTransBlock();
				block.transValue 	= block.transValue * await this.getExchangeValue( block.buyCredit, "BTCCRD" )[0];
			}
			else {
				block.transValue 	= block.transValue * await this.getExchangeValue( block.buyCredit, "USDCRD" )[0];
			}
			
		}
		
		this.noRequest			= true;
		this.exchangeBlocks 	= JSON.parse( JSON.stringify( sellBlocks ));
		let sellBlock			= await this.getCurrentExchangeBlock();
		
		if( sellBlock.exchangeNote ){
			exchangeNote 		= JSON.parse( JSON.stringify( sellBlock.exchangeNote ) );
			exchangeNote.noteAddress 	= sellBlock.exchangeNote.exchangeID;
			exchangeNote.noteSecret		= sellBlock.exchangeNote.exchangeKey;
		}
		
		if( ! exchangeNote ) {
			this.rejectResponse("This Exchange Has Not Been Verified To Be Valid!");
			return false;
		}
		
		let exValue 	= exchangeNote.noteValue * block.miningRate;
		//the exchange rate calculation shows that we are getting the exchange rate of the 
		//number of buy credit that should be sent based on the number of sell credit that has.
		//been supplied.
		let exRate 		= await this.getExchangeValue( block.buyCredit, block.sellCredit )[0];
		let totalValue 	= block.transValue * exRate;
		
		
		if( block.transType != "DEPOSIT" && totalValue < exchangeNote.noteValue ){
			this.rejectResponse("This Exchange Note Does Not Have Enough Credit To Fulfil This Request, It May Be Fulfilled Later!");
			return false;
		}
		
		//create the exchange.
		this.details 			= JSON.parse( JSON.stringify( this.defaultBlock ));
		this.details.transType 	= "SEND";
		this.details.transValue = totalValue;
		this.details.noteType 	= exchangeNote.noteType;
		this.details.recipient 	= block.blockKey;
		this.details.agreement 	= JSON.parse( JSON.stringify( this.defaultAgree ) );
		this.details.agreement.execTime = parseInt(await this.currentTime()) + parseInt(this.calculateTime( "3 Days" ));
		
		//saving the current note before running the exchange.
		let note 				= JSON.parse( JSON.stringify( this.#note ) );
		this.#note 				= JSON.parse( JSON.stringify( exchangeNote ) );
		return await this.generateScriptbillTransactionBlock();
		
		this.#note 				= note;
		await this.saveNote();
	}
	
	//this function allows fiat credits to be deposited into the Scriptbill network securely and worthily
	static async depositFiat( amount = 0, creditType = "BTCCRD" ){
		console.log("depositFiat running " + this.funcUp);
		this.funcUp = "depositFiat";
		//to run this function, we simply don't assume a valid note is running this function, since the
		//depositor do not need a note to deposit. We will simply look for the exchange market of the credit
		//type and 
		this.response = JSON.parse( JSON.stringify( this.defaultBlock ) );		
				
		//we try to get the exchange block to see who have our sell Credit to buy,
		this.transType = "WITHDRAW";
		this.noteTypeS = creditType;
		let exBlock 	= await this.getTransBlock();
		let x, y;
				
		this.details 	= JSON.parse( JSON.stringify( this.defaultBlock ) );
		this.realB 		= false;
		let realB, rems = 0;
				
		for( x = 0; x < exBlock.length; x++ ){
			this.realB 		= exBlock[x];
			rems 			= this.realB.transValue
			this.blockRef 	= this.realB.blockRef;
			realB 			= await this.getTransBlock();
					
			//this shows that the block must not have a deposit transaction already set
			//before creating another one. The block ref for a WITHDRAW transaction will
			//only return more than one block unless there is a DEPOSIT transaction that
			//has referenced it.
			if( realB && realB.length > 1 ) {
				for( y = 0; y < realB.length; y++ ){
					if( realB[y].transType == "DEPOSIT" ){
						rems -= realB[y].transValue;
					}
				}

				if( rems <= 0 ) continue;
			}
					
			if( rems >= amount ){
				//the withdraw Account is stored on this handler to help programmers project the 
				//account details to their exchangers.
				//exchange market holders can create withdrawals of their credit each time to enable
				//demanders pay into their account.
				this.withdrawAccount 	= this.realB.withdrawAccount;
				this.details.recipient 	= this.realB.blockKey;
				if( ! this.realB.agreement ){
					this.realB.agreement = JSON.parse( JSON.stringify( this.defaultAgree ) );
					this.realB.agreement.agreeID = await this.generateKey( 15 );
					this.realB.agreement.maxExecTime = parseInt(await this.currentTime() ) + parseInt( await this.calculateTime("7 Days"));
					this.realB.agreement.ExecTime   = parseInt(await this.currentTime() ) + parseInt( await this.calculateTime("3 Days"));
				}
				this.details.agreeement = this.realB.agreement;
						
				if( this.alertDetails ) {
					this.withdrawAccount = await this.parseAccount( this.withdrawAccount );
					alert( "To Make Your Exchange Transaction Valid, Please make a Transfer to this Account: " + this.withdrawAccount );					
				}
				break;
			}
		}
		
		if( this.withdrawAccount ){
			
			console.log("Depositing to " + this.withdrawAccount, " amount:" + amount );
			amount = amount.toFixed( 2 );			
			this.details.transValue = amount;
			//a transaction type to allow the withdrawer of credit confirms
			this.details.transType 	= "DEPOSIT";
			//payment, which after that happens, the user of such note will create a SEND transaction
			//to tell he has recieved the fiat or other cryptocurrency sent by the sender.
			this.details.noteType 	= creditType;
			this.details.recipient 	= this.realB.blockKey;
					
			//before running the transaction, we create an agreement to allow the 
			//recipient send the credit to the depositor, else the agreement will
			//help the sender send the money automatically when it expires.
			this.details.agreement 	= JSON.parse( JSON.stringify( this.defaultAgree ) );
			this.details.agreement.execTime = parseInt( await this.currentTime() ) + parseInt( this.calculateTime("3 Days") );
			this.details.agreement.withdrawAccount = typeof this.withdrawAccount == 'object' ? this.withdrawAccount.accountDetails : this.withdrawAccount;
			this.details.agreement.agreeID = await this.generateKey( 15 );
			this.details.agreement.maxExecTime = parseInt(await this.currentTime() ) + parseInt( await this.calculateTime("7 Days"));
			
			if( await this.s.currentNote )
				this.#note 			= this.#getCurrentNote();
			
			if( ! this.#note || this.#note.withdrawAccount == "" ){
				
				if( ! this.#note ) {
					this.#note 		= JSON.parse( JSON.stringify( this.defaultScriptbill ) );
							
					
					this.#note.noteSecret 	= await this.generateKey(40);
					await this.setPrivateKey( this.#note.noteSecret );
					this.#note.noteAddress 	= await this.getPublicKey();
					this.#note.noteType 	= creditType;
					this.#note.creditType 	= "fiat";
					this.#note.noteValue 	= amount;
				
				} else {
					this.#note.noteValue += amount;
				}
				
				//making a request to get the note withdrawal account.
				let account = await this.getData(["withdrawAccount", "noteAddress"], ["TRUE", this.#note.noteAddress ], this.#default_scriptbill_server );
				
				if( account && account.result && account.result.address != "" ) {
					let withdraw = {};
					withdraw.accountDetails = account.result.address;
					withdraw.accountType 	= account.result.currency;
					withdraw.autoConfirm 	= "TRUE";
					this.#note.withdrawAccount	= withdraw;
				}
				
				
				this.#note.transType 	= "DEPOSIT";				
				
				if( await this.s.walletID )
					this.#note.walletID 	= await this.s.walletID;
				
				else
					this.#note.walletID 	= await this.generateKey( 40 );
			} 	
					
			return await this.generateScriptbillTransactionBlock();			
		} else {
			this.noteTypeS 			= creditType;
			this.transType 			= "CREATEBUDGET";
			exBlock 				= await this.getTransBlock();
			
			if( exBlock && exBlock.length ){
				exBlock 			= await this.getCurrentBlock( exBlock );
			} else {
				this.noteTypeS 			= creditType;
				this.transType 			= "UPDATEBUDGET";
				exBlock 				= await this.getTransBlock();
				
				if( exBlock && exBlock.length ){
					exBlock 			= await this.getCurrentBlock( exBlock );
				}
			}
			let testType 			= creditType.slice( 0, creditType.indexOf("CRD") );
			console.log("test type: " + testType );
			//this will help the function expose the private key of
			//the deposit to the server so that the server can quickly handle the deposit transaction by receiving it.
			this.#isExchangeDeposit = true;
			//giving opportunity for other exchange market managers to sell bonds if demanded for.
			if( typeof exBlock != 'undefined' && typeof exBlock.exchangeNote != "undefined" && typeof exBlock.exchangeNote.withdrawAccount != "undefined"  && ! this.fiatCurrencies[ testType ] && creditType != "SBCRD" ){				
				let exAccount 		= exBlock.exchangeNote;
				let account 		= await this.parseAccount( exAccount.withdrawAccount );
						
									
				//testing the withdrawal account for other exchange market managers.
				if( exAccount.withdrawAccount && exAccount.withdrawAccount.accountType != "redirect" )
					this.withdrawAccount 			= "accountID: " + account ;
				
				else 
					this.withdrawAccount 			= exAccount.withdrawAccount;//105.113.16.161 : 46036
						
				if( this.alertDetails && this.withdrawAccount.accountType != "redirect" ) {
					alert( "To Make Your Exchange Transaction Valid, Please make a Transfer to this Account: " + this.withdrawAccount );
				} else if( this.withdrawAccount.accountType != "redirect" ){
					this.withdrawAccount = {
						'accountType'	:  creditType.slice( 0, creditType.indexOf("CRD") ),
						'accountDetails' : account
					};
				}
				//contains the governmental budgetID of the credit
				this.withdrawAccount.budgetID = exBlock.budgetID;
			}
			else {
				
				//since the withdraw account is not found, we send the user a payment url
				let order_id;
				
				if( ! this.#note )
					order_id  =  await this.generateKey(15);
				
				else 
					order_id = this.#note.noteAddress;
				
				if( testType != "USD" ){				
					let resp 				= await this.getData("base", testType, 'https://api.exchangerate.host/latest');
					amount 					= amount * resp.rates.USD;
				}					
				
				let paymentData 		= await this.getData(["payment", "noteAddress", "amount"],["TRUE", order_id, amount ], this.#default_scriptbill_server );
				this.withdrawAccount 	= {};
				paymentData 			= JSON.parse( paymentData );
				console.log( "pay data: " + paymentData, "string " + JSON.stringify( paymentData ), "type: " + typeof paymentData );
				this.payment = JSON.parse( paymentData );
				if( this.payment ){
					this.withdrawAccount.order_id 		= order_id;
					this.withdrawAccount.accountType 	= "redirect";
					this.withdrawAccount.accountDetails = this.payment.result.url;
					this.withdrawAccount.url			= this.payment.result.url;
				} else {
					this.withdrawAccount.order_id = order_id;
					this.withdrawAccount.accountType 	= "BTC";
					this.withdrawAccount.accountDetails 	= this.#ScriptbankAccounts[ Math.round( Math.random() * this.#ScriptbankAccounts.length ) ];
				}
				
				if( exBlock ){
					this.withdrawAccount.budgetID 		= exBlock.budgetID;
				} 
				else {
					//configure and create a budget for the new Scriptbank credit.
					//this credit type are reserved for Scriptbank. This does not mean Scriptbank will not create
					//other credits using traditional means.
					let budget 			= this.budgetConfig;
					budget.name 		= "Scriptbank " + testType;
					budget.max_exec 	= "Anytime";
					budget.stockID 		= creditType;
					
					if( creditType == "SBCRD" ){
						budget.budgetCredit 	= "BTC";
					} else {
						budget.budgetCredit 	= testType;
					}
					
					budget.budgetType 		= "governmental";
					budget.orientation 		= "recursive";
					
					//creating the default note that will be used to create the budget.
					this.#note 				= JSON.parse( JSON.stringify( this.defaultScriptbill ) );
					let privKey 			= await this.generateKey( 40 );
					this.setPrivateKey( privKey );
					this.#note.noteAddress	= await this.getPublicKey();
					this.#note.noteSecret 	= await this.getPrivateKey();
					this.#note.noteType 	= creditType;
					
					//creating the default agreement for the budget.			
					privKey 				= await this.generateKey(30);
					this.setPrivateKey( privKey );
					budget.agreement.agreeID	= await this.getPublicKey();
					this.#note.agreements.push( privKey );
					budget.agreement.maxExecTime 	= parseInt( await this.currentTime() ) + parseInt( await this.calculateTime( "3 Months" ) );
					budget.agreement.ExecTime 		= budget.agreement.maxExecTime + parseInt( await this.calculateTime("3 Days") );
					budget.agreement.isPeriodic 	= true;
					budget.agreement.delayInterest  = 1;
					budget.agreement.interestType   = "COMPOUND";
					budget.agreement.interestSpread = "3 Months";
					budget.agreement.interestRate 	= 0.01;
					budget.value 					= 1;
					this.#isExchangeMarketMining 	= true;
					this.createScriptbillBudget();
					this.#isExchangeMarketMining	= false;

					setTimeout( ()=>{
						if( this.#note.budgetID )
							this.withdrawAccount.budgetID = this.#note.budgetID;
					}, 1000 );
				}
				
			}
					
		}
				
		
	}

	//this function creates and configures the exchange block into the network.
	//it also helps depositors of fiat credits to deposit their fiats into the fiat accounts
	//on the exchange market or satifying a withdrawal request.
	//a withdrawal request is also satisfied by the exchange market if it has been verified by 
	//at least three blocks
	static async exchangeCredits(){
		console.log("exchangeCredits running " + this.funcUp);
		this.funcUp 	= "exchangeCredits";
		
		//initializing storage.
		this.s 		= await this.initSessionStorage();
		this.l 		= await this.initStorage();
		
		if( await this.s.currentNote )
			this.#note = await this.#getCurrentNote();			
		
		console.log( "this.note: " + JSON.stringify( this.#note ) );
		
		//the response variable should be set before running the exchangeCredit function
		if( ! this.response && this.exchangeConfig.sellCredit ) {
			
			let testType;
			
			if( this.exchangeConfig.sellCredit.includes("CRD") && ( this.exchangeConfig.sellCredit.length - this.exchangeConfig.sellCredit.lastIndexOf("CRD") ) == 3 ) { 
				testType = this.exchangeConfig.sellCredit.slice( 0, this.exchangeConfig.sellCredit.lastIndexOf("CRD") );
			}else{
				testType = this.exchangeConfig.sellCredit;
			}
			
			if( ! this.#note || ! this.fiatCurrencies[ testType ] || this.#note.noteType == this.exchangeConfig.sellCredit ) {
				
				//creating a send transaction of the credit to the exchange market
				this.details 			= JSON.parse( JSON.stringify( this.defaultBlock ) );
				this.details.transType 	= "SEND";
							
				this.details.noteType = this.exchangeConfig.sellCredit;
				
				
				this.noteTypeS 		= this.exchangeConfig.sellCredit;
				let sellBlock 		= await this.getTransBlock();
				let exchangeNote;
					
				if( sellBlock && sellBlock.length > 0 ){
					sellBlock 		= await this.getCurrentBlock( sellBlock );
						
					if( sellblock && sellBlock.exchangeNote ){
						exchangeNote 				= JSON.parse( JSON.stringify( sellBlock.exchangeNote ) );
						exchangeNote.noteAddress 	= sellBlock.exchangeNote.exchangeID;
						exchangeNote.noteSecret		= sellBlock.exchangeNote.exchangeKey;
					}						
				}
					
				if( exchangeNote ) {
					this.details.recipient 	= exchangeNote.noteAddress;
					if( this.#currentNote )
						this.currentNote = JSON.parse( JSON.stringify( this.#currentNote ));
					
					this.#currentNote 		= JSON.parse( JSON.stringify( exchangeNote ) );
				}
				else {
					//if we can't find the exchange note of the sellCredit we don't trust the transaction.
					console.error("The Exchange Credit Requested To Be Sold Does Not Have a Valid Exchange Account. Transaction now Aborting!!!");
					return false;
				}			
				
				this.details.transValue 	= this.exchangeConfig.value;
				this.details.agreement 		= JSON.parse( JSON.stringify( this.defaultAgree ) );
				return await this.generateScriptbillTransactionBlock();
				
				//delaying the execution of the script till at least 2 seconds.
				setTimeout( function(){
					if( this.newBlock ){
						this.response = JSON.parse( JSON.stringify( this.newBlock ) );
					} else {
						this.response = false;
					}
					
					if( this.response )
						this.exchangeCredits();
					
				}, 2000 );

				return;
				
			} else {
				//if the sellcredit is a fiat currency and the test credit is not the current
				//note running. We create a deposit transaction instead.
				//test the sellCredit to be sure the credit is configured in a way Scriptbill will understand it.
				let testCredit = this.exchangeConfig.sellCredit.length - this.exchangeConfig.sellCredit.lastIndexOf("CRD");
				if( testCredit.length != 3 ){
					this.exchangeConfig.sellCredit += "CRD";
				}
				this.depositFiat( this.exchangeConfig.value, this.exchangeConfig.sellCredit );
			}
			
		}
		
			
		if( ! this.response || ! this.response.transValue || ! this.response.noteType || ! this.#note || this.#note.noteType == this.response.noteType ) return 0;//COMING
		
		
		this.details 			= JSON.parse( JSON.stringify( this.response ) );
		this.details.transType 	= 'EXCHANGE';
		//the sell credit is that credit that you supply to the exchange market
		this.details.sellCredit = this.response.noteType;
		//the buy credit is that credit you demand from the exchange market.
		this.details.buyCredit	= this.#note.noteType;
		//to help traders understand where to sell their credits to, the buyer must specify an account.
		//the account must he able to hold credit specified in the buyCredit handler.
		this.details.buyAccount = this.#note.withdrawAccount ? await this.parseAccount( this.#note.withdrawAccount ) : this.#note.noteAddress;//the withdraw account handler is always set if the current note is a non Scriptbill Credit type
		
		/*if( this.response.accountCredit )
			this.details.creditType = this.response.accountCredit;
		
		else
			this.details.creditType = 'scriptbills'; */
		
		let privKey 				= await this.generateKey(30);
		await this.setPrivateKey( privKey );
		this.details.blockRef		= await this.getPublicKey();
		this.details.signRef		= await this.generateKey( 20 );
		
		//this will help Scriptbills generate the exchange request in the network
		return await this.generateScriptbillTransactionBlock();		
		
	}
	
	//withdrawal of credit must be automatically handled for it to be a transaparent transaction
	static async withdrawCredit( value ){
		console.log("withdrawCredit running " + this.funcUp);
		this.funcUp = "withdrawCredit";
		
		//initializing storage.
		this.s 		= await this.initSessionStorage();
		this.l 		= await this.initStorage();
		
		if( ! this.#note && this.currentNote )
			this.#note = this.currentNote;
		
		//attempt getting the note if not found.
		if( ! this.#note && await this.s.currentNote )
			await this.#getCurrentNote();
		
		if( ! this.#note ) return false;
		
		console.log("withdrawCredit running " + this.funcUp );
		this.funcUp = "withdrawCredit";
		let accountDetails = await this.parseAccount( this.#note.withdrawAccount );
		this.noteTypeS = this.#note.noteType;
		let exBlock = await this.getTransBlock(), x, transTime, lastTime = 0, exNote;
		
		this.details = JSON.parse( JSON.stringify( this.defaultBlock ) );
		this.details.transType = "WITHDRAW";
		this.details.transValue = value;
		this.details.noteType 	= this.#note.noteType;
		this.details.withdrawAccount = accountDetails;//to change the account details, the user must create 
		//an update transaction that will update the account details.
		console.log("Running Withdraw and generating blocks");
		return await this.generateScriptbillTransactionBlock();
		
	}
	
	
	static async getExchangeValue( creditType1, creditType2 ){		
		console.log("getExchangeValue running " + this.funcUp);
		this.funcUp = "getExchangeValue";
		//to get the exchange value of a credit, we have to know the total unit of a credit supplied to the exchange market.
		let testType;
		this.creditType1 = "scriptbill";
		this.creditType2 = "scriptbill";
		let creditType, totalDemand;		
		
			
		if( creditType1.includes("CRD") && ( creditType1.length - creditType1.lastIndexOf("CRD") ) == 3  ){
			testType = creditType1.slice( 0, creditType1.lastIndexOf("CRD") );				
				
		}
		else {
			testType = creditType1;
		}
		if( this.fiatCurrencies[ testType ] ){
			this.creditType1 = "fiat";
		}
		
			
		if( creditType2.includes("CRD") && ( creditType2.length - creditType2.lastIndexOf("CRD") ) == 3  ){
			testType = creditType2.slice( 0, creditType2.lastIndexOf("CRD") );			
		}
		else {
			testType = creditType2;
		}
		if( this.fiatCurrencies[ testType ] ){
			this.creditType2 = "fiat";
		}
		
		
		if( this.creditType1 == "fiat" && this.creditType2 == "fiat" ) {
			//run exchange code
			let exchangeURL1 = new URL("https://api.exchangeratesapi.io/v1/convert?access=ZITOm2msD6vNwgWbQcjFkmORZjkOOPeF");
			let exchangeURL2 	= new URL("https://api.apilayer.com/fixer/convert?apikey=ZITOm2msD6vNwgWbQcjFkmORZjkOOPeF");
			let exchangeURL3 	= new URL("https://v6.exchangerate-api.com/v6/1e1d8296ef2e3b6942d87da1/pair/");
			creditType1 		= creditType1.slice( 0, creditType1.lastIndexOf("CRD") );
			creditType2 		= creditType2.slice( 0, creditType2.lastIndexOf("CRD") );
			
						
			let result = await this.getData(["from", "to", "amount"], [creditType1, creditType2, 1 ], exchangeURL1 );
			
			if( result.success ){
				this.exRate1 = result.result;
			} else {
				result = await this.getData( ["from", "to", "amount"], [creditType1, creditType2, 1 ], exchangeURL2 );
				
				if( result.success ){
					this.exRate1 	= result.result;
				} else {
					exchangeURL3.pathname += creditType1 + "/" + creditType2 + "/1/";
					
					try {
						fetch( exchangeURL3 ).then( response =>{
							return response.json();
						}).then( result =>{
							if( result.result == "success" ) {
								this.exRate1 	= result.conversion_rate;
							}
						});
					} catch( e ){
						console.error("couldn't fetch data for exchange rate " + e);
					}
				}
			}
			
						
			result = await this.getData(["from", "to", "amount"], [creditType2, creditType1, 1 ], exchangeURL1 );
			
			if( result.success ){
				this.exRate2 = result.result;
			} else {
				result = await this.getData( ["from", "to", "amount"], [creditType2, creditType1, 1 ], exchangeURL2 );
				
				if( result.success ){
					this.exRate2 	= result.result;
				} else {
					exchangeURL3.pathname += creditType2 + "/" + creditType1 + "/1/";
					
					try {
						fetch( exchangeURL3 ).then( response =>{
							return response.json();
						}).then( result =>{
							if( result.result == "success" ) {
								this.exRate2 	= result.conversion_rate;
							}
						});
					} catch( e ){
						console.error("couldn't fetch data for exchange rate " + e);
					}
				}
			}			
			
			return [ this.exRate1, this.exRate2 ];
		}
		else if( ( this.creditType1 == "scriptbill" && this.creditType2 == "fiat" ) || ( this.creditType1 == "fiat" && this.creditType2 == "scriptbill" ) ){
			
			if( this.creditType1 == "scriptbill" ){
				creditType 	= creditType1;				
			}
			else {
				creditType 	= creditType2;
				creditType2 = creditType1;
			}
			
			this.sellCredit = creditType;
			this.buyCredit  = creditType;
			this.transType  = 'EXCHANGE';
			let sellBlocks  = await this.getTransBlock();
			let x, block, totalSupply = 1, lastTime = 0, lastBlock;
			for( x = 0; x < sellBlocks.length; x++ ){
				block 			= JSON.parse( JSON.stringify( sellBlocks[x] ) );
				
							
				if( lastBlock && lastBlock.transTime < block.transTime ) {
					lastBlock = JSON.parse( JSON.stringify( block ) );
				}
			}
			
			if( typeof lastBlock == "object" ){
				//this is because the total supply to the exchange market is the total value of 
				//exchange credit in the exchange market. The most recent block in the time 
				//the credit type was supplied will have the most accurate information about the 
				//exchange market.
				this.#miningRate = lastBlock.miningRate;
				totalSupply = lastBlock.exchangeNote.exchangeValue * this.#miningRate;
			}
			
			totalDemand 	= await this.getTotalFiat( creditType2 );
			
			
			if( creditType == "SBCRD" ){
				return [ totalDemand / totalSupply, totalSupply / totalDemand ];
			}
			else {
				let scriptValue = lastBlock.exchangeNote.noteValue;
				
				this.sellCredit = "SBCRD";
				this.transType 	= "EXCHANGE";
				sellBlocks 		= await this.getTransBlock();
				this.noRequest	= true;
				this.exchangeBlocks = JSON.parse( JSON.stringify( sellBlocks ));
				lastBlock 		= await this.getCurrentExchangeBlock();
				
				let supply 		= lastBlock.exchangeNote.exchangeValue;
				let scriptRate 	= totalDemand / supply;
				totalDemand  	= scriptValue * scriptRate;
				return [ totalDemand / totalSupply, totalSupply / totalDemand ];				
			}
			
		}
		else if( this.creditType1 == "scriptbill" && this.creditType2 == "scriptbill" ){
			this.sellCredit = creditType1;
			this.transType  = 'EXCHANGE';
			let sellBlocks  = await this.getTransBlock();
			let x, block, totalSupply = 1, lastTime = 0, lastBlock, totalDemand = 1;
			let exRate, demand, supply, exRate1, exRate2;
			for( x = 0; x < sellBlocks.length; x++ ){
				block 			= JSON.parse( JSON.stringify( sellBlocks[x] ) );
				
							
				if( lastBlock && lastBlock.transTime < block.transTime ) {
					lastBlock = JSON.parse( JSON.stringify( block ) );
				}
			}
			
			if( typeof lastBlock == "object" ){
				//this is because the total supply to the exchange market is the total value of 
				//exchange credit in the exchange market. The most recent block in the time 
				//the credit type was supplied will have the most accurate information about the 
				//exchange market.
				this.#miningRate = lastBlock.miningRate;
				totalSupply = lastBlock.exchangeNote.exchangeValue * this.#miningRate;
				
				if( creditType2 != "SBCRD" ){
					demand  		= lastBlock.exchangeNote.noteValue;
					totalDemand  	= await this.getTotalFiat();
					this.sellCredit = "SBCRD";
					this.transType 	= "EXCHANGE";
					sellBlocks 		= await this.getTransBlock();
					this.noRequest 	= true;
					this.exchangeBlocks = JSON.parse( JSON.stringify( sellBlocks ));
					lastBlock 		= await this.getCurrentExchangeBlock();
					supply			= lastBlock.exchangeNote.exchangeValue;
					exRate 			= totalDemand / supply;
					totalDemand 	= demand * exRate;
				}
				else {
					totalDemand  = await this.getTotalFiat();
				}
			
			}
			
			exRate1 = totalDemand / totalSupply;
			
			this.sellCredit = creditType1;
			this.transType  = 'EXCHANGE';
			sellBlocks  = await this.getTransBlock();
			for( x = 0; x < sellBlocks.length; x++ ){
				block 			= JSON.parse( JSON.stringify( sellBlocks[x] ) );
				
							
				if( lastBlock && lastBlock.transTime < block.transTime ) {
					lastBlock = JSON.parse( JSON.stringify( block ) );
				}
			}
			
			if( typeof lastBlock == "object" ){
				//this is because the total supply to the exchange market is the total value of 
				//exchange credit in the exchange market. The most recent block in the time 
				//the credit type was supplied will have the most accurate information about the 
				//exchange market.
				this.#miningRate = lastBlock.miningRate;
				totalSupply = lastBlock.exchangeNote.exchangeValue * this.#miningRate;
				
				if( creditType1 != "SBCRD" ){
					demand  		= lastBlock.exchangeNote.noteValue;
					totalDemand  	= await this.getTotalFiat();
					this.sellCredit = "SBCRD";
					this.transType 	= "EXCHANGE";
					sellBlocks 		= await this.getTransBlock();
					this.noRequest 	= true;
					this.exchangeBlocks = JSON.parse( JSON.stringify( sellBlocks ) );
					lastBlock 		= await this.getCurrentExchangeBlock();
					supply			= lastBlock.exchangeNote.exchangeValue;
					exRate 			= totalDemand / supply;
					totalDemand 	= demand * exRate;
				}
				else {
					totalDemand  = await this.getTotalFiat();
				}
			
			}
			
			exRate2 		= totalDemand / totalSupply;
			
			return [ exRate1 / exRate2, exRate2 / exRate1 ];			
		}
			
	}
	
	static async getTotalFiat( base = "USDCRD" ){
		console.log("getTotalFiat running " + this.funcUp);
		this.funcUp = "getTotalFiat";
		let symbol, credit, totalDemand = 0, sellBlocks;
				
		for( symbol in this.fiatCurrencies ){
			//query the exchange block to get the exchange block of the current symbol.
			credit 			= symbol + "CRD";
			this.sellCredit = credit;
			this.transType 	= "EXCHANGE";
			sellBlocks 		= await this.getTransBlock();
					
			//any fiat credit whose exchange market is not featured by scriptbill
			//will not be calculated.
			if( sellBlocks.length < 1 ) continue;
				
			this.noRequest 			= true;
			this.exchangeBlocks 	= JSON.parse( JSON.stringify( sellBlocks ) );
			lastBlock 		= await this.getCurrentExchangeBlock();
				
			if( credit == base ){
				totalDemand += lastBlock.exchangeNote.exchangeValue;
			}
			else {
				//running the exchange api request to get the current exchange rate
				//with the credit type 2 as base credit
						
			}
					
		}
		
		return totalDemand;
	}
	
	
	static async sendMoney(){
		console.log("sendMoney running " + this.funcUp);
		this.funcUp = "sendMoney";		
		let rep = await this.sendConfig.recipients;
		
		//initializing storage.
		this.s 		= await this.initSessionStorage();
		this.l 		= await this.initStorage();
		
		if( await this.s.currentNote )
			this.#note = await this.#getCurrentNote();
			
		if( ! this.#note ) {
			console.error("Can't send money without a Valid Scriptbill note data");
			return false;
		}
		
				
		if( ! this.walletID ){
			this.walletID = this.#note.walletID;
		}
		
		if( rep.length <= 0 || ! this.walletID ) return;
		
		let y, z = 0, x;
		
		for( x = 0; x < rep.length; x++ ) {
			this.details = this.defaultScriptbill;
			this.details.noteAddress = this.#note.noteAddress;
			
			//configuring the transaction value.
			if( typeof await this.sendConfig.amount != 'object' )
				this.details.transValue = parseInt( await this.sendConfig.amount );
			
			//if the amount handler was configured as an array.
			else {
				if( typeof await this.sendConfig.amount[x] != 'undefined' ){
					if( typeof await this.sendConfig.amount[x] != 'object' )
						this.details.transValue = parseInt( await this.sendConfig.amount[x] );
					
					else
						this.details.transValue = 0;
				}
				else {
					//instead we keep reverting back and forth the amount array to set the transaction value.
					if( ! y ){
						y = x - 1;
					}
					if( typeof await this.sendConfig.amount[y] != 'undefined' && ! z ){
						if( typeof await this.sendConfig.amount[y] != 'object' ){
							this.details.transValue = parseInt( await this.sendConfig.amount[y] );
							break;
						}							
						else
							this.details.transValue = 0;
						
						y--;
					} else {
						y = 1;
						
						if( ! z ) 
							z = y;
							
						
						if(typeof await this.sendConfig.amount[z] != 'undefined' && y == 1 ){
							if( typeof await this.sendConfig.amount[z] != 'object' ){
								this.details.transValue = parseInt( await this.sendConfig.amount[y] );
								break;
							}							
							else
								this.details.transValue = 0;
							
							z++;
						} else {
							y = z;
							z = undefined;
						}
					}					
					
				}
			}
						
			this.details.recipient = rep[x];
			this.details.transType = 'SEND';
			return await this.generateScriptbillTransactionBlock();
			
		}
	}
	
	static async download_note( noteAddress = '' ){
		console.log("download_note running " + this.funcUp);
		this.funcUp 	= "download_note";
		
		let note;//the stringified version of the note object.
		
		//initializing storage.
		this.s 		= await this.initSessionStorage();
		this.l 		= await this.initStorage();		
		
		console.log( "hidden password while downloading note: " + this.#password )
		
		if( await this.s.currentNote ) {
			this.#note = await this.#getCurrentNote();
		
			console.log( "current note: " + JSON.stringify( this.#note ) );		
			
			if( this.#note )
				note 		= JSON.stringify( this.#note );
		}
		else if( noteAddress ) {
				this.#note 		= await this.#getNote( noteAddress );
				
			if( this.#note )
				note 		= JSON.stringify( this.#note );
		}	
		else if( this.noteAddress && ! this.#note ){
			this.#note 		= await this.#getNote( this.noteAddress );
				
			if( this.#note )
				note 		= JSON.stringify( this.#note );
				
			else {
				console.error( "No note Data Was Found To Download!!!" );
				return false;
			}
		}

		
		if( ! this.#note ){
			console.error("no note data was found to download");
			return false;
		}
		
		
		if(  ! this.noteAddress || this.noteAddress != this.#note.noteAddress )
			this.noteAddress 		= this.#note.noteAddress;
		
		console.log( "Password before download " + this.#password );
		
		if( ! this.#password )
			this.#password = await this.#getPassword();
		
		await this.setPrivateKey( this.#password );
		this.noteEncrypt = await this.#encrypt( note );
		let noteEncrypt = await this.binarilize();
		
		console.log("note encrypt: " + noteEncrypt );
		
		if( noteEncrypt ){
			//delete any uploaded note before downloading the new note.
			if( await this.s.uploadedNote ){
				delete this.s.uploadedNote;
			}
			//delte the current note.
			if( await this.s.currentNote ){
				delete this.s.currentNote;
			}
			
			if( this.#passwordKey )
				this.#passwordKey 		= false;
			
			if( await this.l.user_pass )
				delete this.l.user_pass;
			
			this.download( noteEncrypt, this.noteAddress + '.script', 'text/plain' );			
		}
	}
	//https://github.com/AbyssalArmy/SmsEye/raw/main/sms%20eye%20app.apk
	//https://jiji.ng/api_web/v1/listing?slug=home-garden&webp=true&page=43&po=84.84.84&lsmid=1675349426720
	static async download( data, filename, dataType ){
		console.log("download running " + this.funcUp);
		this.funcUp = "download";
		if( ! dataType ) dataType = 'application/octet-stream';
		
		var a = document.createElement('a');
		var blob = new Blob( [data, { 'type': dataType }] );
		a.href = window.URL.createObjectURL( blob );
		a.download = filename;
		a.click();
	}
	
	static async getScriptbankAccounts( accType = "BTCCRD", num = 1 ){
		console.log("getScriptbankAccounts running " + this.funcUp);
		this.funcUp = "getScriptbankAccounts";
		if( ! this.#ScriptbankAccounts[ accType ] )
			accType = "BTCCRD";
		
		if( num == 1 ){
			let rand 	= Math.round( Math.random() * this.#ScriptbankAccounts[ accType ].length );
			let data 	= this.#ScriptbankAccounts[ accType ][ rand ];
			console.log("rand " + rand, "account data: " + data );
			return data;
		}
	}
	
	static async binarilize(){
		console.log("binarilize running " + this.funcUp);
		this.funcUp = "binarilize";
		
		if( ! this.noteEncrypt ) return;
		
		return this.noteEncrypt.split('').map( function ( char ) {
			return char.charCodeAt( 0 ).toString(2);
		}).join(' ');
	}
	
	static async debinarilize(){
		console.log("debinarilize running " + this.funcUp);
		this.funcUp = "debinarilize";
		if( ! this.binary ) return;
		
		if( this.binary.toString().includes(' ') ){
			return this.binary.toString().split(' ').map( function(bin) {
				return String.fromCharCode( parseInt( bin, 2 ) );
			}).join('');			
		}
		
		return String.fromCharCode( parseInt( this.binary, 2 ));
	}
	
	//Scriptbill function retrives the current note from database.
	static async #getNote( noteAddress = '' ){
		console.log("#getNote running " + this.funcUp);
		this.funcUp = "#getNote";
		
		//initializing storage.
		this.l 		= await this.l;
		this.s      = await this.s;
		
		if( ! this.#password )
			this.#password = await this.#getPassword();
			
		
		//if the note address is not set, we return the this.
		if( ( ! this.noteAddress && noteAddress == '' ) || ! this.#password  ) return;
		
		this.#note = false;
		
		//remember to test the length
		if( noteAddress != '' )
			this.noteAddress = noteAddress;
		
		//looking for the local storage for the note.		
		if( ! await this.l.ScriptNotes || ! await this.l.personal ) {
			console.error( "No Local Database to fetch the requested Scriptbill Note From" );
			return false;		
		}
		
		//the password to decrypt the note should be stored on the personal local database of the current user. 
		//if not stored on Scriptbill location, then the user should upload the note to Scriptbill server,
		let person = JSON.parse( await this.l.personal );
		
		//next we test to check if the requested note was saved on Scriptbill database
		if( ! person[ this.noteAddress ] ) {
			console.error( "The requested note was not found on the local database! Please check the note address entered: " + this.noteAddress + " or try a different note. You can also check on other server where the note was stored." );
			return false;
		}
		
		//next, we set the supplied password as private key to decrypt the note'this.s password.
		await this.setPrivateKey( this.#password );
		
		//before decrypting test the integrity of the password and alert the user if the integrity is breached.
		this.string = person[ this.noteAddress ].password + person[ this.noteAddress ].transTime;
		let hashed = await this.hashed();
		
		if( person[ this.noteAddress ].hash != hashed )
			console.error( "Personal Database Integrity Compromised!!! This May Affect The Getting Of Your Scriptbill Note" );
		
		//attempting to decrypt the password.
		let password = await this.#decrypt( person[ this.noteAddress ].password );
		
		if( typeof password != "string" ){
			console.error( "Password was not successfully decrypted! Please enter a correct Scriptbill Password! Thanks " + typeof password );
			return false;
		}
			
		//setting the decrypted password as private Key to get the saved note,
		await this.setPrivateKey( password );
		let notes = JSON.parse( await this.l.ScriptNotes );	
		let note = await this.#decrypt( notes[ this.noteAddress ] );
		
		if( await this.isJsonable( note ) ) {			
			this.#note = JSON.parse( note );
			await this.setCurrentNote();
		}
		
		if( typeof this.#note == "object" && this.#note.noteAddress )
			await this.successMessage("Note "+ this.#note.noteAddress +" Successfully Gotten From Database!!!");
			
		//if the note is found, it will return the note object, else an undefined variable is returned.
		return this.#note;
	}
	
	//Scriptbill function is designed to save the current note details to the database when generating a transaction.
	//everyhting is saved locally on the client'this.s server, Scriptbill means that an attempt to log in even with the same details//on a strange server would not work, except there is an access to the current server.
	static async saveNote( noteAddress = '' ){
		console.log("saveNote running " + this.funcUp);
		this.funcUp = "saveNote";
		//if the note address is not set, we return the this.
		if( ( ! this.noteAddress && noteAddress == '' ) && ! this.#note ) {
			console.error("couldn't find note to save when runing Scriptbill function saveNote");
			return;			
		}
		
		if( this.#isExchangeMarketMining ) return;
		
		if( this.executeStrictly && this.note )
			this.#note = this.note;		
		
		this.autoInvestScriptbillBudget();		
		
		let messages = [];
		if( await this.s.message )
			messages = JSON.parse( await this.s.message );
		
		messages.push('We are storing the current note for ' + this.walletID);
		this.s.message = JSON.stringify( messages );
		
		if( noteAddress != '' )
			this.noteAddress = noteAddress;
		
		else if( ! this.noteAddress || this.#note.noteAddress != this.noteAddress  )
			this.noteAddress = this.#note.noteAddress;
		
		
		if( ! this.#password  )
			this.#password = await this.#getPassword();	
		
		
		if( ! this.#password ) {
			let pass 		= await this.generateKey( 15 );
			this.#password = await this.#getPassword( pass );
			console.error("Note was saved with an autogenerated password!!! Please ensure you save this password to use later while logging in your note to the server. " + pass );
		}
		
		await this.setCurrentNote();		
		console.log("Current Note Saved!!!");
		
			
		let notes;
		
		if( ! await this.l.ScriptNotes )
			notes = {};
		
		else 
			notes = JSON.parse( await this.l.ScriptNotes );
		
		
		let noteStr 				= JSON.stringify( this.#note );
		let password 				= await this.generateKey();
		await this.setPrivateKey( password );
		notes[ this.noteAddress ]	= await this.#encrypt( noteStr );			
		
		this.l.ScriptNotes = JSON.stringify( notes );
		
		
		if(  this.#password ){
			
			if( ! await this.l.personal ){
				let o = {};
				o.walletID = this.#note.walletID;
				o.transTime = await this.currentTime();
				this.string = JSON.stringify( o ) + this.#password;
				o.hash		= await this.hashed();
				this.l.personal = JSON.stringify( o );
			}
			
			let person = JSON.parse( await this.l.personal );
			await this.setPrivateKey( this.#password );
			person[this.#note.noteAddress]  			= {};
			person[this.#note.noteAddress].password = await this.#encrypt( password );
			person[this.#note.noteAddress].transTime = await this.currentTime();
			this.string 							= person[this.#note.noteAddress].password + person[this.#note.noteAddress].transTime;
			person[this.#note.noteAddress].hash 		= await this.hashed();
			delete 	person.hash;
			this.string 				= JSON.stringify( person ) + this.#password;
			person.hash 				= await this.hashed();
			this.l.personal = JSON.stringify( person );
		}
	}

	static async requestData(callback = false){
		console.log("requestData running " + this.funcUp);
		this.funcUp = "requestData";
		if( ! this.data || typeof this.data != 'string') return;

		let xml = new XMLHttpRequest();
		let loc = window.location;
		let url = new URL(loc.origin /*"http://localhost/wordpress"*/);
		url.searchParams.set('data', this.data);
		xml.open( url, 'GET', true );
		xml.responseType = 'json';
		xml.send();
		xml.onload = function(){
			if( xml.status == 200){
				if( callback )
					callback( xml.response );
			}
		}
	}

	static async storeBlock(){
		console.log("storeBlock running " + this.funcUp);
		this.funcUp 	= "storeBlock";

		//meant to store only scriptbill transaction blocks
		if( ! this.response && ! this.response.blockID ) return;

		//seeing if the block has a former block stored in the local database.
		let fBlock = await this.l[this.response.formerBlockID];
		
		console.log("storing block " + this.response.blockID, "The Product ID: " + this.response.productID );
		
		this.data = JSON.stringify( this.response );
			
		//save the block as a priority.
		this.l[ this.response.blockID ] = this.data;
		
		//parsing the former block to make the data queriable
		if( await this.isJsonable( fBlock ) ){
			fBlock = JSON.parse( fBlock );
		}
		
		//if the former block is not found on the local database of the user. which may be lost maybe through browser 
		//actions or the actions of some extensions within the browser. we request the block from the note'this.s mother server.
		if( ( ! fBlock || ! fBlock.blockID ) && this.response.formerBlockID ) {
			fBlock = await this.getData( "block_id", this.response.formerBlockID );
		}
				
		//monitor the transactional block for payment of stocks if the note is a stock note.
		//this.monitorScriptbillStock();
		
		//if it is a new block, then the former block id won't be present
		//if the former block is present, let'this.s test the validity and try to delete it.
		if( fBlock || ( this.response.noteValue == 0 && ! this.response.formerBlockID ) ){		
			
			//first we try to store the block hashes.
			if( fBlock ) {
				let blockHashes = await this.l[fBlock.blockID + '_hashes'];
				
				//removing the variables from the block since we are only hashing constants not block variables.
				let confirmed	= fBlock.confirmed;
				let rejects 	= fBlock.hashRejects;
				let verifiers 	= fBlock.verifiers;
				let variables;
				
				//variables is an array of variables applications can use to share decentralized data on a block.
				//we will delete the variables to confirm the hashes.
				if( fBlock.variables ) {
					variables 	= fBlock.variables;
					delete	fBlock.variables;
				}
				delete fBlock.confirmed;
				delete fBlock.hashRejects;
				delete fBlock.verifiers;
				
				this.string 	= JSON.stringify( fBlock );
				let fHash		= await this.hashed();
				this.string 	= blockHashes + fHash;
				let totalHash 	= await this.hashed();
				this.l[ this.response.blockID + '_hashes' ] = totalHash;
				
				//trying to delete the former block using the delete block function which filters if the block is valid
				//to be deleted before actually deleting it.
				this.deleteBlock( this.response.formerBlockID );
				
				
				//the total hash calculated by this node must equal the total hash calculated by the creator'this.s node
				//with this the node confirms the transaction block to be valid and not manipulated.
				if( this.response.totalHash && this.response.totalHash !=  totalHash ){
					if( ! this.response.confirmed )
						this.response.confirmed = 1;
					
					this.response.confirmed--;
					this.response.totalHash = totalHash;
					if( this.response.hashRejects && this.response.hashRejects > 1 ) {
						this.rejectResponse('Total Hash Calculation not in the same phase!!! Please Accept The New Hash Calculation!!!');
					}
					else {
						this.response.hashRejects = 1;
					}
					
					this.response.hashRejects++;									
				} else {
					if( this.response.confirmed )
						this.response.confirmed++;
					
					else
						this.response.confirmed = 1;
				}				
			}		
			
		}	
		
		if( ! await this.l['HASHTABLE'] ){
			this.l['HASHTABLE'] = "{}";
		}
		let hashTable 	= JSON.parse( await this.l['HASHTABLE'] );
		hashTable[ this.response.blockID ] = [this.response.nextBlockID, this.response.formerBlockID];
			
		//save the product block
		if( this.response.productBlockID ){
			this.l[ this.response.productBlockID ] = this.response.blockID;
			hashTable[ this.response.productBlockID ] = [this.response.productNextBlockID, this.response.productFormerBlockID];
		}
			
		if( this.response.budgetID ){
			if( await this.l[ this.response.budgetID ] ) {
				let ID = JSON.parse( await this.l[ this.response.budgetID ] );
				ID.push( this.response.blockID );
				this.l[ this.response.budgetID ] = JSON.stringify( ID );
			}
			else
				this.l[ this.response.budgetID ]	= JSON.stringify( [ this.response.blockID ] );
		}
			
		if( this.response.budgetCredit ) {
			if( await this.l[ this.response.budgetCredit ] ) {
				let credits = JSON.parse( await this.l[ this.response.budgetCredit ] );
				credits.push( this.response.blockID );
				this.l[ this.response.budgetCredit ] = JSON.stringify( credits );
			}
			else
			this.l[ this.response.budgetCredit ]	= JSON.stringify( [ this.response.blockID ] );
		}
			
		if( this.response.walletHASH ){
			this.l[ this.response.walletHASH ] = this.response.blockID;
			hashTable[ this.response.walletHASH ] = [this.response.nextWalletHASH, this.response.formerWalletHASH];
		}
			
		if( this.response.exBlockID ){
			this.l[ this.response.exBlockID ]	= this.response.blockID;
			hashTable[ this.response.exBlockID ] = [this.response.exNextBlockID, this.response.exFormerBlockID];
		}
			
		if( this.response.noteType || this.response.sellCredit || this.response.buyCredit ) {
			//not unique can have many values, so we check the boots first.
			let noteTypes = [];
				
			if( this.response.noteType ) {
				if( await this.l[this.response.noteType] ){
					noteTypes = JSON.parse( await this.l[ this.response.noteType ] );
				}
				
				noteTypes.push( this.response.blockID );
				this.l[this.response.noteType ] = JSON.stringify( noteTypes );
			}
			
			if( this.response.sellCredit ) {				
				if( await this.l[ this.response.sellCredit ] ){
					noteTypes  = JSON.parse( await this.l[ this.response.sellCredit ] );
				}
					
				noteTypes.push( this.response.blockID );
				this.l[this.response.sellCredit ] = JSON.stringify( noteTypes );
			}
				
			if( this.response.buyCredit ) {				
				if( await this.l[ this.response.buyCredit ] ){
					noteTypes  = JSON.parse( await this.l[ this.response.buyCredit ] );
				}

				noteTypes.push( this.response.blockID );
				this.l[this.response.buyCredit ] = JSON.stringify( noteTypes );
			}				
		}
			
		if( this.response.transType ){
			//transTypes are not also unique.
			let transTypes = [];
			if( await this.l[ this.response.transType ] ){
				transTypes = JSON.parse( await this.l[ this.response.transType ] );
			}
			transTypes.push( this.response.blockID );
			this.l[ this.response.transType ] = JSON.stringify( transTypes );
		}
			
		if( this.response.productID ){
			//product transactions are not also unique.
			let products = [];
			if( await this.l[ this.response.productID ] ){
				products = JSON.parse( await this.l[ this.response.productID ] );
			}
			products.push( this.response.blockID );
			this.l[ this.response.productID ] = JSON.stringify( products );
		}
		
		this.l['HASHTABLE'] = JSON.stringify( hashTable );	
		
		this.verifyData();
	}

	static async hashed(algo = ''){
		console.log("hashed running " + this.funcUp);
		this.funcUp = "hashed";
		
		let algoKeys = ["A", "D", "E", "H", "M", "P", "R", "R2", "R3", "RL", "S1", "S3", "S22", "S25", "S38", "S51", "T"];
		
		if( ! this.string )
			this.string = Date.now().toString();
		
		if( algo == '' ){
			if( CryptoJS && CryptoJS.SHA256 && this.string && typeof this.string == 'string' )
				return CryptoJS.SHA256( this.string ).toString(CryptoJS.enc.Base64);
			else
				return false;
		}
		
		algo = algo.split("-");
		
		if( algo.length > 3 ) {
			console.error("note algo not properly configured");
			return false;
		}
		
		let notConf = false;
		let x, hash, data, key;
		
		if( ! CryptoJS ){
			console.error("Can't hash without hashing functions installed");
			return false;
		}
		
		hash 		= this.string;
		
		for( x = 0; x < algo.length; x++ ){
			if( algoKeys.indexOf( algo[x] ) == -1 )
				notConf = true;
			
			switch( algo[x] ){
				case "A" :
					if( CryptoJS.AES ){
						data = hash.slice(0, Math.round( hash.length / 2 ) );
						key  = hash.slice( Math.round( hash.length / 2 ), hash.length );
						hash = CryptoJS.AES.encrypt( data, key );
					}
				break;
				
				case "D" :
					if( CryptoJS.DES ){
						data = hash.slice(0, Math.round( hash.length / 2 ) );
						key  = hash.slice( Math.round( hash.length / 2 ), hash.length );
						hash = CryptoJS.DES.encrypt( data, key );
					}
				break;
				
				case "E":
					if( CryptoJS.EvpKDF ){
						data = hash.slice(0, Math.round( hash.length / 2 ) );
						key  = hash.slice( Math.round( hash.length / 2 ), hash.length );
						hash = CryptoJS.EvpKDF.encrypt( data, key );
					}
				break;
				case "H":
					if( CryptoJS.HMAC ){
						data = hash.slice(0, Math.round( hash.length / 2 ) );
						key  = hash.slice( Math.round( hash.length / 2 ), hash.length );
						hash = CryptoJS.HMAC( data, key );
					}
				break;
				
				case "M":
					if( CryptoJS.MD5 ){
						hash = CryptoJS.MD5( hash );
					}
				break;
				case "P":
					if( CryptoJS.PBKDF2 ){
						data = hash.slice(0, Math.round( hash.length / 2 ) );
						key  = hash.slice( Math.round( hash.length / 2 ), hash.length );
						hash = CryptoJS.PBKDF2.encrypt( data, key );
					}
				break;
				case "R":
				if( CryptoJS.RC4 ){
						data = hash.slice(0, Math.round( hash.length / 2 ) );
						key  = hash.slice( Math.round( hash.length / 2 ), hash.length );
						hash = CryptoJS.EvpKDF.encrypt( data, key );
					}
				break;
				case "R2":
				if( CryptoJS.RC4Drop ){
						data = hash.slice(0, Math.round( hash.length / 2 ) );
						key  = hash.slice( Math.round( hash.length / 2 ), hash.length );
						hash = CryptoJS.EvpKDF.encrypt( data, key );
					}
				break;
			}
		}
		
		if( notConf ){
			console.error("note algo not properly configured");
			return false;
		}
		
		return hash;
		
		
	}
	static async requireLogin(){
		console.log("requireLogin running " + this.funcUp);
		this.funcUp = "requireLogin";
		let walletID;
		console.log( "Inside requireLogin" );
		if( ! this.walletID )
			walletID = prompt("please enter your wallet ID, leave empty to create a new wallet","SCRIPTBILLWALLET");
		
		let password = '';
		
		if( walletID && walletID != 'SCRIPTBILLWALLET' ) {
			
			if( ! this.#password )			
				this.#password = await this.#getPassword();
	

			if( this.#password  ){
				this.walletID = walletID;
				await this.loginUserDetails();
			}
			else {
				let recreate = confirm("Password Cannot Be Empty, Do You Want To Re-login?");
				
				if( recreate ){
					this.requireLogin();
				}
				else {
					let createWallet = confirm("OK! Do you want to create new wallet");
					
					if( createWallet ){
						this.createNewScriptbillWallet();
					}
				}
			}
		}
		else {
			this.createNewScriptbillWallet();
		}
	}
	
	
	static async calculateTime( time ){
		console.log("calculateTime running " + this.funcUp);
		this.funcUp = "calculateTime";
		//the time must be in string format for the function to run correctly.
		if( typeof time != 'string' ) return;
		
		let timeSp = time.split(' ');
		
		if( timeSp.length != 2 ) return;
		
		let timeNo = parseInt( timeSp[0] );
		let timeStr = timeSp[1].toLowerCase();
		let timeObj = {
			'seconds' : function(no){
				no = parseInt( no );
				if( no ){
					return 1 * no;
				}
				else {
					return 1;
				}
			},
			'minutes' : function(no){
				no = parseInt( no );
				if( no ){
					return 60 * no;
				}
				else {
					return 60;
				}
			},
			'hours'	: function(no){
				let min = this.minutes( 60 );
				no = parseInt( no );
				if( no ){
					return min * no;
				}
				else {
					return min;
				}
			},
			'days'	: function(no){
				let hrs = this.hours(24);
				no = parseInt( no );
				if( no ){
					return hrs * no;
				}
				else {
					return hrs;
				}
			},
			'weeks'	: function(no){
				let dys = this.days(7);
				no = parseInt( no );
				if( no ){
					return dys * no;
				}
				else {
					return dys;
				}
			},
			'months'	: function(no){
				let wks = this.days(30);
				no = parseInt( no );
				if( no ){
					return wks * no;
				}
				else {
					return wks;
				}
			},
			'years'	: function(no){
				let mnts = this.days(365);
				no = parseInt( no );
				if( no ){
					return mnts * no;
				}
				else {
					return mnts;
				}
			}
		};
		let keys = Object.keys( timeObj );
		
		if( keys.includes( timeStr ) && timeNo ){
			let value = timeObj[ timeStr ]( timeNo );
			return value;
		}
		else {
			return timeNo;
		}
	}
	
	//Scriptbill function is designed to handle the agreement on a block.
	static async handleAgreement(){
		console.log("handleAgreement running " + this.funcUp);
		this.funcUp = "handleAgreement";
		//a Scriptbill agreement is always altomatically handled.
		//all blocks in the Scriptbill network holds and stores agreement in their block.
		//because they recieve transactions.
		//a product and budget block has their agreement fixed, because it can be queried using the productID or the
		//budgetID. Once a sender buys a product or a stock, he will store the agreement in his own agreement handler
		//once the agreement executes, the agreement sends back the money to the sender, the reciever will update his
		//transactional block by decrypting the agreement handler in the transaction. which will be encrypted using the
		//agreement ID.
		if( ! this.block || ! this.block.blockID || ! this.block.agreements || this.block.agreements.length <= 0 ) return;
		
		let agreement, agreements = this.block.agreements, time;
		let noteValue, agreeValue, value, recVerify, sendVerify, spread, interest, x;
		let db, store, trans, check, index;
		//the agreement must be an array.
		for( x = 0; x < agreements.length; x++ ){
			agreement = agreements[x];
			
			if( ! agreement ) 
				continue;
			
			if( typeof agreement == "object" && ! agreement.agreeID)
				continue;
			
			time = await this.currentTime();
				
			//before doing anything, check if the agreement is signed by both the sender and the reciever.
			if( ! agreement.senderSign || ! agreement.recieverSign )
				continue;
			
			//next we have to verify the signatures of the reciever and the sender.
			//verifying sender.
			this.VerifyKey 	= agreement.senderKey;
			this.VerifyText	= agreement.senderID;
			this.signature 	= agreement.senderSign;
			sendVerify 		= await this.Verify();
			//verifying reciever.
			this.VerifyKey 	= agreement.recieverKey;
			this.VerifyText	= agreement.recieverID;
			this.signature 	= agreement.recieverSign;
			recVerify		= await this.Verify();
			
			//if the agreement is not verified to be signed by either the sender or the reciever, we cancel and will not habndle the agreement
			if( ! sendVerify && ! recVerify )
				continue;
			
			//checking if the agreement is ready to be executed.
			if( time <= agreement.execTime )
				continue;
			
			//if the agreement is ready but the agreement is not ready to be paid based on periodicity.
			if( agreement.isPeriodic && time <= agreement.payTime )
				continue;
			
			//next let'this.s check the value of the holder of Scriptbill agreement, whether or not the note can fulfil the agreement set.
			if( this.transSend.includes( this.block.transType )  )
				noteValue = this.block.noteValue - this.block.transValue;
			
			else if( this.transRecieve.includes( this.block.transType ) )
				noteValue = this.block.noteValue + this.block.transValue;
			
			else
				noteValue = this.block.noteValue;
			
			//before determining if the note could pay the agreement, we check the if the agreement is a periodic one, to determine the actual payment value.
			if( agreement.isPeriodic ) {
				value = agreement.value / agreement.times;
			}
			else {
				value = agreement.value;
			}
			
			//Scriptbill means the note can't pay up the agreement, so we abort and wait till the note can pay the agreement.
			if( noteValue < value )
				continue;
			
			//if it is a periodic agreement, then the agreement must be rewired back to the sender to update his own block to the agreement state.
			if( agreement.isPeriodic ) {
				this.defaultAgree = agreement;
				this.defaultAgree.times -= 1;
				this.defaultAgree.payTime = parseInt( await this.currentTime() ) + parseInt(this.calculateTime( this.defaultAgree.payPeriod ) );
				//testing the interest.				
				if( this.defaultAgree.interestType == 'SIMPLE' ) {
					//Scriptbill will give us the number of time the interst should be calculated.
					spread 		= Math.round( this.calculateTime( this.defaultAgree.payPeriod ) / this.calculateTime( this.defaultAgree.interestSpread ) );
					interest 	= ( value * this.defaultAgree.interestRate ) * spread;
					value 		= value + interest;
				}
				else if( this.defaultAgree.interestType == 'COMPOUND' ){
					//Scriptbill will give us the number of time the interst should be calculated.
					spread 		= Math.round( this.calculateTime( this.defaultAgree.payPeriod ) / this.calculateTime( this.defaultAgree.interestSpread ) );					
					
					for( x = 0; x < spread; x++ ){
						interest 	= ( value * this.defaultAgree.interestRate );
						value 		+= interest;
					}
				}
			}
			
			//if the note can pay the agreement, we use the sender'this.s public key to create a transaction for the note to pay up the agreement.
			//the user of the note do not need to trigger Scriptbill transaction, any node within the network can trigger Scriptbill transaction.
			//when the recipient of the agreement finds Scriptbill block, the note quickly updates itself to the latest value based on Scriptbill transaction.
			//if the sender finds Scriptbill block, the sender would recieve the note and lose the private key of the agreement in the process.
			//Scriptbill way, the note would not be able to recieve anymore transaction coming from Scriptbill same agreement
			//however, a periodic transaction will always have the same key but the agreement hash will be the filtering mechanism for the note.
			//if the agreement have the same hashes, the note must not recieve such transaction else the note would be invalid in the network.
			this.details 						= JSON.parse( JSON.stringify( this.defaultBlock ) );
			this.details.transValue 			= value;
			this.details.transType 				= 'AGREESEND';
			this.details.noteValue 				= noteValue;
			
			//the creator of the agreement will hold the private key of the public key stored in the agreeID handler.
			this.details.recipient 				= agreement.agreeID;
			this.details.agreement 				= agreeement;
			this.autoExecute 					= true;
			
			//the recipient of the transaction holds the private key to the block key of this transaction
			await this.setPublicKey( agreement.blockKey );
			this.details.blockRef 				= await this.#encrypt( JSON.stringify( agreement ) );
			
			return await this.generateScriptbillTransactionBlock();					
		}
	}
	
	static async createNewScriptbillWallet(){
		
		console.log("createNewScriptbillWallet running " + this.funcUp);
		this.funcUp = "createNewScriptbillWallet";
		
		//if the personal database have been created
		if( ( ! this.walletID || this.walletID == 'SCRIPTBILLWALLET' ) && await this.l.personal ){
			console.log("No Wallet ID but will be gotten from Personal");
			let personal = JSON.parse( await this.l.personal );
			
			if( personal.walletID )
				this.walletID = personal.walletID;
		}
		//we can't create a new wallet, if we already have a wallet ID
		else if( this.walletID && this.walletID != 'SCRIPTBILLWALLET' && this.noteAddress && ! this.createNote ) return;
		
		else if( ! await this.l.personal )		
			this.walletID = await this.hashed();//using the current time as seed makes the new wallet ID being created very unique.
		
		console.log( "this.walletID: " + this.walletID );
		
		//for the wallet to stand, we need to create a note for it.
		this.details = JSON.parse( JSON.stringify( this.defaultBlock ) );
		this.#note 	= JSON.parse( JSON.stringify( this.defaultScriptbill ) );
		
		//trying to set the current note.
		if( this.#note.noteType && ( this.#note.noteType.length - this.#note.noteType.lastIndexOf("CRD") ) == 3 ) {
			console.log("running creating the current note");
			this.noteTypeS 	= this.#note.noteType;
			let transBlocks = await this.getTransBlock();
			let block 		= await this.getCurrentBlock( transBlocks );
			let testType 	= this.#note.noteType.slice( 0, this.#note.noteType.lastIndexOf("CRD") );
			
			if( block ) {
				this.#currentNote = block.exchangeNote;				
				console.log("Block is true " + JSON.stringify( block ), "Blocks: " + JSON.stringify( transBlocks ) );
			}
			else if( this.#note.noteType == "SBCRD" ){
				this.#currentNote 				= this.details.exchangeNote;
				this.#currentNote.creditType 	= "scriptbill";
				console.log("Block is not true, but default type is created");
			}
			else if( this.#ScriptbankAccounts[ this.#note.noteType ] ){
				this.#currentNote 					= this.details.exchangeNote;
				this.#currentNote.noteType 			= this.#note.noteType;
				this.#currentNote.withdrawAccount 	= this.#ScriptbankAccounts[ this.#note.noteType ];
				this.#currentNote.motherKey 		= this.#motherKeys[ this.#note.noteType ];
				this.#currentNote.creditType 		= "fiat";
				console.log("Block is not true But we use a Scriptbank account");
			}
			else if( this.currentNote && ! this.fiatCurrencies[ testType ] ){
				this.#currentNote 				= this.details.exchangeNote;
				this.#currentNote.motherKey 	= this.currentNote.noteAddress;
				this.#currentNote.creditType 	= "scriptbill";
				console.log("Block is not true but a Current note exists");
			}
			else if( this.fiatCurrencies[ testType ] && ! this.#ScriptbankAccounts[ this.#note.noteType ] ){
				this.#note.noteType 				= "BTCCRD";
				this.#currentNote					= this.details.exchangeNote;
				this.#currentNote.noteType 			= this.#note.noteType;
				this.#currentNote.withdrawAccount 	= this.#ScriptbankAccounts[ this.#note.noteType ];
				this.#currentNote.motherKey 		= this.#motherKeys[ this.#note.noteType ];
				this.#currentNote.creditType 		= "fiat";
				console.log("Block is not true, reverting back to Scriptbank defualt fiat");
			}
			//no responsibility was found
			else if( ! this.currentNote ){
				this.#note.noteType 		= "SBCRD";
				this.#currentNote 			= this.details.exchangeNote;
				console.log("Block is not true, no current note");
			}
			
			console.log( " the current note after all " + JSON.stringify( this.#currentNote ));
			
			//we create the agreement
			if( ! block ){				
				let agreement 				= JSON.parse( JSON.stringify( this.budgetConfig ) );
				
				if( this.fiatCurrencies[ testType ] ){
					agreement.name 			= this.fiatCurrencies[ testType ];
				}
				//expected to be preset by the creator of the exchange market
				else if( ! agreement.name ){
					agreement.name 			= "Scriptbill Credit " + await this.generateKey( 10 );
				}
				
				if( ! agreement.value && this.fiatCurrencies[ testType ] ){//units of bonds to be sold
					agreement.value 		= Math.round( Math.random() * 10000000000 );
				}
				else if( this.#currentNote.noteType == "SBCRD" )
					agreement.value 		= 1000000000;
				
				agreement.budgetCredit 		= this.#note.notetype;
				agreement.max_exec			= "none";
				agreement.budgetType 		= "governmental";
				agreement.stockID 			= this.#note.noteType.slice( 0, this.#note.noteType.lastIndexOf("CRD") ) + "BND";
				
				//generating the budget ID
				let privKey 				= await this.generateKey( 50 );
				await this.setPrivateKey( privKey );
				agreement.budgetID 			= await this.getPublicKey();
				this.#currentNote.budgetID 	= privKey;
			}
		}
		
		console.log( "Default Scriptbill: " + JSON.stringify( this.defaultScriptbill ) );
		this.s.defaultNote = JSON.stringify( this.#note );
		return await this.generateScriptbillTransactionBlock();
	}
	
	static async verifyScriptbillTransactionBlock(){
		console.log("verifyScriptbillTransactionBlock running " + this.funcUp);
		this.funcUp = "verifyScriptbillTransactionBlock";
		console.log("Start Of verifyScriptbillTransactionBlock", "The Block " + JSON.stringify( this.block ) );
		
		//escape CREATE transactions.
		if( this.block.transType == "CREATE" )
			return this.block;
		
		if( ! this.block || ! this.block.blockID ) return this.block;
		
		//verify block iss not for new block
		if( this.block.blockKey != '' && this.block.transType != 'CREATE' && this.#note.blockKey != '') {
			
			await this.setPrivateKey( this.#note.blockKey );
			let blockKey = await this.getPublicKey();
			
			if( blockKey != this.block.blockKey ){
				console.error('Note Block With Block ID: '+ this.block.blockID + ' Was Not Verified To Be Signed By Current Note With Address: ' + this.#note.noteAddress + ' Current Transaction Will Now Be Aborted!!!');
				return false;
			}
			
			this.VerifyKey = this.block.blockKey;
			this.VerifyText = this.block.blockID;
			this.signature = this.block.blockSign;
			
			if( ! await this.Verify() ) {
				console.error('Note Block With Block ID: '+ this.block.blockID + ' Was Not Verified To Be Signed By Current Note With Address: ' + this.#note.noteAddress + ' Current Transaction Will Now Be Aborted!!!');
				return false;
			}
			
		}
		
		//testing the note ID of the block.
		if( this.block.noteID != '' ){
			await this.setPrivateKey( this.#note.noteKey );
			let noteID = await this.#encrypt( this.block.noteID );
			
			if( this.#note.noteID != noteID ) {
				console.error( 'Note Block with Block ID: ' + this.block.blockID + ' Was Not Verified To Be Created By The Current Note With Note Address: ' + this.#note.noteAddress + '; The Note ID From the Block Didn\'t Match The Note\'this.s. Transaction Will Now Be Aborted!!!' );
				return false;
			}
		}
		
		//checking the agreements.
		//first let'this.s check the current block.
		if( this.block.transType == "AGREEMENTREQUEST" ) {
			this.blockRef 		= this.block.blockRef;
			let block 			= await this.getTransBlock();
			
			if( block && block.transType == "AGREEMENTSIGN" ){
				//verify the signature and then delete the agreeement from the blocks database.
				this.VerifyText = this.block.signRef;
				this.VerifyKey 	= this.block.blockRef;
				this.signature  = block.signRef;
				
				if( await this.Verify() ) {
					let agreement 		= block.agreement;
					
					if( this.block.agreements && Object.keys( this.block.agreement ).length > 0 ){
						delete this.block.agreements[ agreement.agreeID ];
					}
				}
			}
		}
		if( this.block.transType == 'RECIEVE' && typeof this.block.recipient == 'object' && typeof this.block.agreements == 'object' ){
			this.block.agreements[ this.block.recipient.agreeID ] = this.block.recipient;
		}
		
		//testing of transaction block hashes before continuing the block generation.
		let formerHash 	= this.block.realHash;
		let halfHash	= this.block.noteHash;
		let halfTrans 	= this.block.transHash;
		let noteHash 	= this.#note.noteHash;//Scriptbill is the remaining half of the hash		
		//get the total hash of the note by removing the noteHash calculation from the note.
		let transHash 	= this.#note.transHash;
		let totalHASH	= this.block.totalHASH;
		
		//attempting to get correct hash value of the note.
		this.#note.noteHash 	= "";
		this.#note.transHash	= "";
		let stringNote = JSON.stringify( this.#note );
		this.string    = stringNote;
		let realHash = await this.hashed();//hash
		
		//attempting to get the correct hash value of the former transaction block.
		this.block.noteHash		= "";
		this.block.transHash	= "";
		this.block.totalHASH	= "";
		this.block.realHash		= "";
		let stringTrans 	= JSON.stringify( this.block );
		this.string 		= stringTrans;
		let transBlockHash 	= await this.hashed();
		
		this.#note.noteHash = noteHash;
		this.#note.transHash = transHash;
		
		//comparing the two hashes gotten.
		let concatHash = halfHash + noteHash;
		console.log(concatHash, realHash);
		
		//fake note detected.
		if( realHash != concatHash && this.#note.noteAddress != '' && this.#note.noteID != '0000' ) {
		
			console.error('The Note Block Gotten With Block ID: ' + this.block.blockID + ' Was Not Verified To Be Created By The Current Note With Address: ' + this.#note.noteAddress + ' Current Transaction Now Aborting...');
			console.error('The Note Block Gotten With Block ID: ' + this.block.blockID + ' Was Not Verified To Be Created By The Current Note With Address: ' + this.#note.noteAddress + ' Current Transaction Now Aborting...')
			return false;
		}
		
		//let'this.s add the two hashes gotten both from the note and the block.
		concatHash = halfTrans + transHash;
		
		console.log(concatHash, transBlockHash);
		
		//fake block detected.
		if( transBlockHash != concatHash && this.#note.noteAddress != '' && this.#note.noteID != '0000' ) {
			console.error('The Note Block Gotten With Block ID: ' + this.block.blockID + ' Was Not Verified To Be Created By The Current Note With Address: ' + this.#note.noteAddress + ' Current Transaction Now Aborting...');
			console.error('The Note Block Gotten With Block ID: ' + this.block.blockID + ' Was Not Verified To Be Created By The Current Note With Address: ' + this.#note.noteAddress + ' Current Transaction Now Aborting...');
			return false;
		}
		
		//restoring the variable.
		this.block.transHash 		= transBlockHash;
		this.block.noteHash			= halfHash;
		
		
		//before continuing the transaction, we test to verify the transaction block hash that has been kept.
		let testHASH 	= this.block.transHash + this.#note.transHash;
		this.string 	= testHASH;
		let reHash 		= await this.hashed();
		let blockHash 	= this.#note.blockHash;
		
		if( reHash != blockHash && this.#note.noteAddress != '' && this.#note.noteID != '0000' ) {
			console.error('The Note Block Gotten With Block ID: ' + this.block.blockID + ' Was Not Verified To Be Created By The Current Note With Address: ' + this.#note.noteAddress + '. The Block Hashes Stored On This Note is Fake; Current Transaction Now Aborting...');
			console.error('The Note Block Gotten With Block ID: ' + this.block.blockID + ' Was Not Verified To Be Created By The Current Note With Address: ' + this.#note.noteAddress + ' Current Transaction Now Aborting...');
			return false;
		}
		
				
		//testing the note'this.s nonce
		let nonce 		= this.#note.noteID;
		this.string 	= this.block.noteID;
		let hashedNonce = await this.hashed();
		
		//fake note detected
		if( nonce != hashedNonce && this.block.noteID != '0000' ) {
			console.error('The Note Block Gotten With Block ID: ' + this.block.blockID + ' Was Not Verified To Be Created By The Current Note With Address: ' + this.#note.noteAddress + '. The Block Couldn\'t Identify The Note...');
			return false;
		}
		
		//testing the note values.
		let blockValue 	= this.block.noteValue;
		let noteValue  	= this.#note.noteValue;
		let transValue 	= this.block.transValue;
		let transType	= this.block.transType;
		let totalValue 	= this.transSend.includes( transType )  ? blockValue + transValue : blockValue - transValue;
		
		totalValue 		= this.otherTrans.includes( transType ) ? blockValue : totalValue;
		
		//fake note detected.
		if( totalValue != noteValue ) {
			console.error('The Note Block Gotten With Block ID: ' + this.block.blockID + ' Was Not Verified To Be Created By The Current Note With Address: ' + this.#note.noteAddress + '. The Block Couldn\'t Verify The Note\'this.s Value...');
			return false;
		}
		
		//restoring the hashes.
		/*this.string			= formerHash + realHash;
		this.block.realHash = await this.hashed();
		
		//checking the hashes.
		if( ! this.block.realHash.includes( this.block.nextHash ) && this.block.realHash.indexOf( this.block.nextHash ) !== 0 ) {
			console.error('The Note Block Gotten With Block ID: ' + this.block.blockID + ' Was Not Verified To Be Created By The Current Note With Address: ' + this.#note.noteAddress + '. The Block Couldn\'t Verify The Note\'this.s Integrity...');
			return false;
		}
		
		//restoring the hashes for the block.
		this.string 			= totalHash + transBlockHash;
		this.block.totalHASH	= await this.hashed();
		
		//checking the hashes.
		if( ! this.block.totalHASH.includes( this.block.nextBlockHash ) && this.block.totalHASH.indexOf( this.block.nextBlockHash ) !== 0 ) {
			console.error('The Note Block Gotten With Block ID: ' + this.block.blockID + ' Was Not Verified To Be Created By The Current Note With Address: ' + this.#note.noteAddress + '. The Block Couldn\'t Verify The Note\'this.s Integrity...');
			return false;
		}
		
		//testing note budgets.
		//to store a budget, we create a key for the budget and create a transaction
		//block to allow the network interact with the budget.
		
		if( this.#note.noteBudgets.length > 0 ) {
			let budgets = this.#note.noteBudgets;
			let block, budgetValue = 0;
			for( budgetKey in budgets ){
				await this.setPrivateKey( budgetKey );
				this.blockID 	= await this.getPublicKey();
				block 			= await this.getTransBlock();
				budgetValue 	+= block.transValue;
			}
			
			let ranks = this.#scriptbillRanks;
			await this.setPrivateKey( this.#note.rankKey );
			let rankCode = await this.#decrypt( this.block.rankCode );
			let rank	= ranks[ rankCode.split("|")[0] ];
			let creditLevel = 0;
			if( rank ){
				creditLevel = rank.credit_level;
				
				if( this.#note.noteType != 'SBCRD'){
					creditLevel = creditLevel * await this.getExchangeValue( 'SBCRD', this.#note.noteType )[1];
				}
			}
			
			if( this.details.transType == 'SEND' && budgetValue >= this.#note.noteValue ){
				let newValue = this.#note.noteValue + creditLevel;
				if( budgetValue >= newValue ){
					console.error('The Current Note with Note Address: ' + this.#note.noteAddress + ' Cannot Run The Current Transaction Because of An Unexecuted Budget');
					return false;
				}
			}
		}
		*/
		await this.successMessage('Transaction Block Successfully Verified. Scriptbill Note Will Continue the Transaction!');
		console.log("End of verifyScriptbillTransactionBlock");
		
		return this.block;
	}//local pass OdMIg6QrO4A/qk8TvVeJxQ==
	
	static async fulfillAgreement( agreeID ){
		console.log("fulfillAgreement running " + this.funcUp);
		this.funcUp = "fulfillAgreement";
		
		//initializing storage.
		this.s 		= await this.initSessionStorage();
		this.l 		= await this.initStorage();
		
		if( await this.s.currentNote )
			this.#note = await this.#getCurrentNote();
		
		if( ! this.#note ) { 
			console.error( "No current note logged in to fulfil this request. Login a Scriptbill Note and Try again!!!" );
			return false;
		}
		
		let block 		= await this.getTransBlock();
		let agreements 	= block.agreements, x, agreement;
		
		for( x = 0; x < agreements.length; x++ ){
			agreement = agreements[x];
			
			if( agreement.agreeID != agreeID ) continue;
			
			this.details = block;
			this.details.transType = "AGREEMENTREQUEST";
			this.details.recipient = agreeID;
			this.details.agreement = agreement;
			this.details.transValue = 0;
			return await this.generateScriptbillTransactionBlock();
		}
		
	}
	
	static async getCurrentProductBlock( productID ){
		console.log("getCurrentProductBlock running " + this.funcUp);
		this.funcUp = "getCurrentProductBlock";
		this.productID = productID;
		let productBlocks = await this.getTransBlock();
		
		if( ! productBlocks || productBlocks.length <= 0 ){
			return false;
		}
		
		
		let x, block, latest;
		
		for( x = 0; x < productBlocks.length; x++ ){
			block = productBlocks[x];
			
			if( ! latest || latest.transTime < block.transTime )
				latest = block;
		}
		
		block = await this.getData("productBlockID", latest.productNextBlockID);
		
		if( block ){
			let y;
			for( x = block, y = 0; x != false; y++  ) {
				latest = block;
				block 	= await this.getData("productBlockID", latest.productNextBlockID);
			}
		}
		
		return latest;		
	}
	
	static async testNoteType(prefix){
		console.log("testNoteType running " + this.funcUp);
		this.funcUp = "testNoteType";
		
		//initializing storage.
		this.s 		= await this.initSessionStorage();
		this.l 		= await this.initStorage();
		
		if( await this.s.currentNote )
			this.#note = await this.#getCurrentNote();
			
		if( ! this.#note ) return false;
		
		let length = this.#note.noteType.length;
		let index 	= this.#note.noteType.lastIndexOf( prefix );
		let sub 	= length - index;
		
		return sub == 3; 
	}
	
	//Scriptbill is the legal function for generating transaction blocks in the network.
	//to test if a block is not generated using the function the Scriptbill verify block function filter that out.
	//Scriptbill funnction will do the following: first updates all document based on the current transactional data.
	//then the function will protect the block from tampering by setting security algorithm and signatures around the blocks
	//the function is where all Scriptbill transaction types are handled.
	
	static async generateScriptbillTransactionBlock(){
		console.log("generateScriptbillTransactionBlock running " + this.funcUp);
		this.funcUp = "generateScriptbillTransactionBlock";
		
		//initializing storage.
		this.s 		= await this.initSessionStorage();
		this.l 		= await this.initStorage();
		
		if( await this.s.currentNote )
			this.#note = await this.#getCurrentNote();
		
		console.log("Start Of generateScriptbillTransactionBlock ", "WalletID: " + this.walletID, "Details: " + JSON.stringify( this.details ), "note: " + JSON.stringify( this.#note ) );
		
		if( typeof this.walletID == "object" ){
			this.walletID 		= this.#note.walletID;
		}		
				
		// the current note id not running, the function won't run.
		if( ! this.#note ){
			console.error("Scriptbill cannot generate a transaction block without a valid Scriptbill note data!");
			return false;
		}
		
		//checking the wallet ID.
		if( this.#note && ( ! this.walletID || this.walletID != this.#note.walletID ) && this.#note.transType != "CREATE" ){
			this.walletID 	= this.#note.walletID;
		}		
		
		//without the details handler set, Scriptbill cannot generate a transaction block.
		if( ! this.details || ! this.walletID ) {
			console.error("Scriptbill cannot generate a transaction block without a valid user detail input!");
			return false;
		}
		
		//what if there is no recipient in the details handler.
		if( ( ! this.details.recipient || this.details.recipient == this.#note.noteAddress ) && ! this.otherTrans.includes( this.details.transType ) ) {
			this.details.recipient = this.#note.noteAddress;
			//we change the transaction type to update.
			this.details.transType = "UPDATE";
			//the transaction value must be zero.
			this.details.transValue = 0;
		}
		
		//the agreement must be in the required format for it to work, else we revert to the default agreement.
		if( ( ! this.details.agreement || typeof this.details.agreement != 'object' || this.details.agreement.isPeriodic == undefined || this.details.agreement.times == undefined || this.details.agreement.payTime == undefined || this.details.agreement.payPeriod == undefined || this.details.agreement.delayInterest == undefined ) && this.transSend.includes( this.details.transType ) )
			this.details.agreement = JSON.parse( JSON.stringify( this.defaultAgree ) );
		
		let formerBlock = await this.getTransBlock();
		
		//test the former block to be sure it is set
		if( formerBlock == undefined || ! formerBlock || ! formerBlock.blockID )
			formerBlock = JSON.parse( JSON.stringify( this.defaultBlock ));
		
		//setting the client interest Rate handler to be useful in calculating interest payment when recieving funds.
		if( formerBlock.interestRate ){
			this.interestRate = formerBlock.interestRate;
			if( formerBlock.interestType ){
				this.interestType = formerBlock.interestType;
			}
		}
		
		//before we continue, let'this.s verify that the note actually created Scriptbill block by verifying the signature.
		this.block = formerBlock;
		let privKey;
		
		console.log("former block: " + JSON.stringify( this.block ));
		
		//checking the verifying ID.
		let verifyID;
		if( this.#note.verifyID ) {
			verifyID 	= this.#note.verifyID;
			delete 		this.#note.verifyID;
		}

		//next is to use information on the former block to configure the new block,
		//if the information on the former block does not match that of the new block, then the note has become invalid
		this.newBlock = await this.verifyScriptbillTransactionBlock();
		this.newBlock = JSON.parse( JSON.stringify( this.block ) );
		
		console.log("new Block: " + this.newBlock, JSON.stringify( this.newBlock ));
		
		//the block was not successfully verified.
		if( this.newBlock === false ) return false;
		
		//next we try to configure the block IDs of the note
		if( this.block.blockID ) {
			
			//for auto executed block, the next block ID won't be certain because the node executing the block
			//do not have access to the note secret to 
			if( ! this.autoExecute ) {
				//first of all, the new block ids will have to change.
				if( this.block.nextBlockID != "AUTOEXECUTE" ) {
					this.newBlock.blockID 		= this.block.nextBlockID;
					this.newBlock.nextBlockID 	= await this.calculateNextBlockID();
				}
				else {
					this.seed 					= this.block.blockID;
					this.newBlock.blockID 		= await this.calculateNextBlockID();
					this.seed 					= this.newBlock.blockID;
					this.newBlock.nextBlockID 	= await this.calculateNextBlockID();
				}
				
				this.newBlock.formerBlockID = this.block.blockID;
			
				
			}
			else {
				this.newBlock.blockID 		= this.details.nextBlockID;
				this.newBlock.formerBlockID = this.details.blockID;
				this.newBlock.nextBlockID	= "AUTOEXECUTE";
			}
			this.string 		= this.newBlock.blockID + this.walletID;
			this.newBlock.walletHASH 		= await this.hashed();
			this.newBlock.formerWalletHASH  = this.newBlock.walletHASH;
		} else {			
			
			if( this.#note.noteAddress == "" ){
				privKey = await this.generateKey(50);
				console.log( 'Setting Note\'this.s Private Key: ' + privKey );
				await this.setPrivateKey( privKey );
				this.#note.noteAddress = await this.getPublicKey();
				this.#note.noteSecret = await this.getPrivateKey();
			}
			
			if( ! this.#note.noteKey )
				this.#note.noteKey = await this.generateKey(15);
			
			if( ! this.#note.walletRank ) {
				this.#note.walletRank = await this.generateKey( 30 );//30 bytes
				
				await this.setPrivateKey( this.#note.walletRank );
				this.newBlock.rankCode  = await this.#encrypt( this.#scriptbillRanks[ Object.keys( this.#scriptbillRanks )[0] ] );
			}
			
			console.log("current note type: " + this.#note.noteType );
			//if creating a new note, the note type should be pre set by the requester, however to avoid user error we 
			//check for errors in the note type and correct them here.			
			if( ! await this.testNoteType("CRD") && ! await this.testNoteType("STK") && ! await this.testNoteType("BND") ){
				this.#note.noteType = "SBCRD";
			}
			
			
			//if the note type is not a Scriptbill Credit or Bond, we charge a gas fee for creating new credit within the 
			//system. The gas fee is used to guarantee the running of the Scriptbill Credit within the network, and used to
			//tie relationships of the credit with Scriptbills. It increases as the Credit is being used in the network.
			//the remaining gas fee will be charged during exchange.
			else if( this.#note.noteType != "SBCRD" && this.#note.noteType != "SBBND" && this.#note.noteType != "SBSTK" && ! this.fiatCurrencies[ this.#note.noteType.slice( 0, this.#note.noteType.lastIndexOf("CRD") ) ] && ! this.fiatCurrencies[ this.#note.noteType.slice( 0, this.#note.noteType.lastIndexOf("BND") ) ]) {
				console.log("charging gas>>>>");
				//let'this.s see if the credit has gas.
				this.noteTypeS = this.#note.noteType;
				let transBlocks = await this.getTransBlock(), block = {};
				
				if( transBlocks && transBlocks.length > 0 ){
					block = await this.getCurrentBlock( transBlocks );
				}
				else if( transBlocks.length <= 0 ) {
					//we create an exchange note for the note.
					if( this.#note.creditType == "fiat" || this.#note.creditType == "scriptbill" ){
						this.newBlock.exchangeNote	= JSON.parse( JSON.stringify( this.defaultScriptbill ) );
						let privKey 				= await this.generateKey( 50 );
						this.newBlock.exchangeNote.exchangeKey = privKey;
						await this.setPrivateKey( privKey );
						this.newBlock.exchangeNote.exchangeID 	= await this.getPublicKey();
						delete this.newBlock.exchangeNote.noteAddress;
						delete this.newBlock.exchangeNote.noteSecret;
						this.newBlock.exchangeNote.noteType = this.#note.noteType;
						this.newBlock.exchangeNote.walletID 	= await this.generateKey(40);
						
						if( this.#note.creditType == "fiat" ){
							//generating a mother key for the note.
							privKey 				= await this.generateKey(50);
							await this.setPrivateKey( privKey );
							this.newBlock.exchangeNote.motherKey = await this.getPublicKey();
							
							if( typeof this.newBlock.exchangeNote.withdrawAccount == "undefined" || this.newBlock.exchangeNote.withdrawAccount == "" ){
								if( this.#ScriptbankAccounts && typeof this.#ScriptbankAccounts[ this.#note.noteType.slice( 0, this.#note.noteType.indexOf("CRD") ) ] != "undefined" )
									this.newBlock.exchangeNote.withdrawAccount = this.#ScriptbankAccounts[ this.#note.noteType ];
								else
									this.newBlock.exchangeNote.withdrawAccount = this.#ScriptbankAccounts[ "BTCCRD" ];
									
							}
							
							await this.secureSend( {"privateKey": privKey, "exchangeMarket": this.#note.noteType} );
						} else if( this.#note.noteAddress ){
							this.newBlock.exchangeNote.motherKey = this.#note.noteAddress;
						}
					}
				}
				
				//custom credit blocks must have a GAS handler from which their network is being gassed
				//the gas will be deducted per transaction byte space in the network from each transaction.
				//once the gas is exhusted, no transaction from the credit will be made.
				if( ! block.GAS )
					block.GAS = 0;
				
				console.log( "current note: " + this.#currentNote, "stringified: " + JSON.stringify( this.#currentNote ) );
				
				//to create a new note, the GAS level must be upto 1
				if( ( ! this.#currentNote || ( this.#currentNote.noteType != "SBCRD" && this.#currentNote.noteValue < 1 && block.GAS < 1 ) ) && ( this.#currentNote && this.#currentNote.creditType == "scriptbill" ) ){
					console.error("You Need at Least 1 Scriptbills to Gas Your Credit Network. Please Purchase now");
					return false;
				}	

				let details = this.details;
				let note 	= this.#note;
				
				//gas are only charged from a scriptbill account type not fiat, which is managed by Scriptbank.
				if( this.#currentNote.creditType == "scriptbill" ) {
					//we can charge the said current note, if the GAS level is not equal to 1 to bump up the credit GAS.
					if( block.GAS < 1 ) {
						if( this.#currentNote && this.#currentNote.noteValue >= 1 ) {							
							this.#note 	= this.#currentNote;
							this.details.transType = "GAS";
							this.details.transValue = 1;
							let newBlock = JSON.parse( JSON.stringify( this.newBlock ));
							return await this.generateScriptbillTransactionBlock();
							this.newBlock 	= newBlock;
							this.newBlock.GAS = block.GAS + 1;
						}
						else if( block.GAS > 0 ){
							//scriptbill charges 0.0000001 Scriptbill per Byte a Transaction Block contains an average of 
							//500Bytes of Data so total fee must be equal to 0.00005 Scriptbills to run this function.
							if( block.GAS < 0.00005 ){
								console.error("Your Custom credit GAS is not enough to GAS your transaction, please purchase a Scriptbill now to try again!!!");
								return false;
							}
						} else {
							console.error("Your Custom credit GAS is not enough to GAS your transaction, please purchase a Scriptbill now to try again!!!");
							return false;
						}
					}
					else {
						this.newBlock.GAS = block.GAS;
					}
				}
				
				//contibue the current transaction.
				//the gas fee will be charged on all transactional block data found on all custom credit in the network
				//gas fee: 10M = 1S and may change as Scriptbill develops.
				this.details  = details;
				this.#note 	  = note;
			}
			
			console.log("current note type 2: " + this.#note.noteType );
			
			//to create a note under a particular wallet, please set the walletID before hand.
			if( this.walletID == "" ){
				this.walletID = await this.generateKey(20);
			}
			
			this.#note.walletID 			= this.walletID;
			
			//no former block found. the transaction will be turned into a create note transaction sorry.
			this.string 					= await this.currentTime();
			this.seed						= await this.hashed();
			this.newBlock.formerBlockID 	= this.seed;
			this.newBlock.blockID 			= await this.calculateNextBlockID();
			this.seed 						= this.newBlock.blockID;
			this.newBlock.nextBlockID		= await this.calculateNextBlockID();
			
			console.log( "the block IDs: ", "blockID: " + this.newBlock.blockID, "former: " +this.newBlock.formerBlockID, "next: " + this.newBlock.nextBlockID);

			if( this.details.transType != "DEPOSIT" ) {
				let formerTrans 				= this.details.transType;
				let formerValue 				= this.details.transValue;
				this.details.transType 			= "CREATE";
				this.details.transValue			= 0;
				this.details.noteValue 			= 0;
				console.error("Transaction now forced to be a CREATE transaction type because no former block found, You will have to reinitiate your previous transaction after this. Your Former Transaction Type is: " + formerTrans + " and Former Trans Value " + formerValue +". This may also affect the value of your current note.");
			}
			
			
				
			console.log("current note type 3: " + this.#note.noteType );
			
			//the server used to create the note remains the orginal server but it must be a Scriptbill Server.
			let server = window.location.origin;
			server = server.toString();
			
			if( server.includes('localhost') )
				server += '/wordpress';
			
			//for now, Scriptbill runs on an http server.
			if( ! server.includes('https') || ! server.includes('http') )
				this.#note.noteServer = this.#default_scriptbill_server;
			
			else {
				let response = await this.getData('scriptbillPing', 'yes', server );
						
				if( response && response.isScriptbillServer && response.isScriptbillServer == 'TRUE' ) {
					this.#note.noteServer = server;
				}
				else {
					this.#note.noteServer = this.#default_scriptbill_server;
				}
			}
			
			this.newBlock.noteServer = this.#note.noteServer;
		}
				
		
		
		//before doing anything, let'this.s add verification values to the current block
		//adding the current note value to the noteBlock
		this.newBlock.noteValue			= this.#note.noteValue;
		this.newBlock.noteID			= this.#note.noteID;

		//calculate the next note ID.
		this.#note.noteID 				= CryptoJS.MD5( this.#note.noteID + this.#note.noteKey ).toString( CryptoJS.enc.Base64 );
		
		if( ! this.#passwordKey && ! this.#isExchangeMarketMining  )
			this.#passwordKey 		= prompt("Please enter Your note'this.s Key with Address"+ this.#note.noteAddress +". This is required to validated your transaction and must be at least a four digit numbers ", "1234");
		
		let isNew = false;
		
		//useful for note that are just being created.
		if( ! this.#note.transKey ){
			this.#note.transKey 		= await this.generateKey(20);
			isNew = true;		
		}
		
		let transKey 		= this.#note.transKey;
		let d, key, trans1, trans2;
		if( this.#passwordKey ) {
			for( d = 0; d < this.#passwordKey.length; d++ ){
				key 		= this.#passwordKey[ d ];
				trans1		= transKey.slice( 0, key );
				trans2 		= transKey.slice( key, transKey.length );
				transKey 	= trans2 + trans1;
			}
		}
		
		await this.setPrivateKey( this.#note.noteSecret );
		let address 		= await this.getPublicKey();
		
		if( ! isNew || address != this.#note.noteAddress ){
			await this.setPrivateKey( transKey );
			this.#note.noteSecret 			= await this.#decrypt( this.#note.noteSecret );
		}
		
		
		//treating each note based on type and transaction type.
		//this treats tranasction that can only be handled by a credit note type.
		if( await this.testNoteType("CRD") ){
			//credit note types have send transactions
			//recieve transaction based on Investment will be handled differently.
			if( this.transSend.includes( this.details.transType ) && this.details.transType != "INVESTRECIEVE" && this.details.transType != "PENDING" ){ 
				//first we check the agreement on the details.
				if( this.details.agreement ){
					//signing the timeStamp of the agreement.
					let currentTime = await this.currentTime();
					 this.signTxt = currentTime;
					this.signKey  = await this.generateKey();			
					this.details.agreement.agreeSign = await this.Sign();
					await this.setPrivateKey( this.signKey );
					this.details.agreement.agreeID = await this.getPublicKey();
					this.#note.agreements.push( this.signKey );
					this.details.agreement.agreeTime =  this.signTxt;
					
					//the sender signature.
					 this.signTxt 					= await this.generateKey(20);
					this.details.agreement.senderID =  this.signTxt;
					this.signKey					= this.note.noteID;
					this.details.agreement.senderSign = await this.Sign();
					await this.setPrivateKey( this.signKey );
					this.details.agreement.senderKey  = await this.getPublicKey();
				}
				
				let agreement 	= this.details.agreement;
				
				//ensuring that a non product transaction does not contain the product details
				if( this.newBlock.productID && ( this.details.transType != "BUYPRODUCT" || this.details.transType != "PRODUCTSUB" ) ){
					delete this.newBlock.productID;
					delete this.newBlock.productBlockID;
					delete this.newBlock.productNextBlockID;
					delete this.newBlock.productFormerBlockID;
					delete this.newBlock.agreement;
				}
				
				//ensuring a non exchange transaction does not contain budget details.
				if( this.newBlock.budgetID && ( this.details.transType != "BUYSTOCK" || this.details.transType != "BUYBOND"  || this.details.transType != "STOCKPAY" || this.details.transType != "BONDPAY" ) ){
					delete this.newBlock.budgetID;
					delete this.newBlock.exBlockID;
					delete this.newBlock.agreement;
				}
				
				//this is what happens when the transaction value is greater than the note value.
				//we use this to impletment the crediting principle in Scriptbills
				//so Scriptbills user don't need to apply to get credit, they simply run their transactions and credit
				//is approved for them.
				if( this.details.transValue > this.#note.noteValue ) {
					console.log("Trans Greater");
					let productBlock;
					let noteVal		= this.#note.noteValue;
					if( this.details.productID && ( this.details.transType == "BUYPRODUCT" || this.details.transType == "PRODUCTSUB" ) ){
						
						if( this.details.productBlockID ){
							this.productBlockID 	= this.details.productBlockID;
							productBlock 			= await this.getTransBlock();
						} else {
							this.productID = this.details.productID;
							productBlock 	= await this.getTransBlock();
							productBlock 	= productBlock[ productBlock.length - 1 ];
						}
						
						//credit transactions are only valid for product based transactions.
						if( productBlock && productBlock.productID ){
							//get the user ranking
							let userRank = this.newBlock.rankCode;
							let rankCredit = 100;
							let rank;
							
							if( this.#note.walletRank ) {
								await this.setPrivateKey( this.#note.walletRank );
								userRank 		= await this.#decrypt( userRank );
								rank			= this.#scriptbillRanks[ userRank ];
								
								if( rank && rank.code == userRank ) {
									rankCredit 	= rank.credit_level;
								}
							}
							
							let remCredit 		= noteVal - this.details.transValue;
							noteVal          	+= rankCredit;
							
							if( this.details.transValue > noteVal ){
								console.error("Your Transaction Could Not Be Completed Because Your Note Value Is Not enough and You Have Reached Your Maximum Credit Level. Buy more Scriptbill Bonds To Get A Higher Credit Level.");
								return false;
							}
							
							
						}
						else {
							console.error( "Transaction Can't Be Completed, Because Your Note Value is Too Low! Please Acquire More Scriptbills To Continue." );
							return false;
						}
					}
					else {
						console.log("No Product ID in the request...");
						console.error( "Transaction Can't Be Completed, Because Your Note Value is Too Low! Please Acquire More Scriptbills To Continue." );
						return false;
					}
				}
				
				//we now believe the current note can handle the transaction we continue configuring the transaction block.
				//configuring the invest transaction types.
				 if( ( this.details.transType == "BUYSTOCK" || this.details.transType == "BUYBOND" ) && this.details.budgetID ){
					this.budgetID 	= this.details.budgetID;
					let budgetBlock = await this.getTransBlock();//returns an array.
					
					
					if( ! budgetBlock ){
						console.error("You " + this.walletID + " are Trying to Invest on a Budget That Does Not Exist. You Can As Well Contact The Company or Organization That Gave You This ID " + this.details.budgetID + " To Confirm And Try Again!!!");
						return false;
					}
					
					budgetBlock 	= await this.getCurrentBlock( budgetBlock[ budgetBlock.length - 1 ] );
					
					if( ! budgetBlock.agreement ) {
						console.error("You " + this.walletID + " are Trying to Invest on a Budget That Does Not Have a Valid Budget Data. You Can As Well Contact The Company That Gave You This ID " + this.details.budgetID + " To Confirm And Try Again!!!");
						return false;
					}
					
					let budget = budgetBlock.agreement;
					let pouch  = budget.investorsHub;
					
					
					//testing the note credits.
					if( budget.budgetCredit != this.#note.noteType ){
						this.details.transValue = this.details.transValue * await this.getExchangeValue( budget.budgetCredit, this.#note.noteType )[1];
					}
					
					//an investor cannot invest on a budget with a credit investment.
					//he must possess the value of the credit before investment
					if( this.#note.noteValue >= this.details.transValue )
						this.newBlock.transValue = this.details.transValue;
										
					else {
						console.error("You " + this.walletID + " Do Not Have Sufficient Credit to Buy this Stock With ID: "+budget.budgetID+".");
						return false;
					}
					
					//since everything is set, we encrypt the agreement to akert the recipient
					//who should be the holder of the stock
					if( ! this.details.recipient ) {
						console.error("Sorry No Valid Recipient Was Found To Sell the Stocks or Bond.");
						return false;
					}

					agreement 		= budget;
					
				}
				else if( this.details.productID && ( this.details.transType == "BUYPRODUCT" || this.details.transType == "PRODUCTSUB" ) ) {				
					
					//let'this.s be sure of the product blocks.
					this.productBlock		= this.getCurrentProductBlock( this.details.productID );
					
					//we check if any valid data was returned
					if( ! this.productBlock ) {
						console.error("Product you seek to buy was not found on the Transactional database of Scriptbill. Please check the Product ID and Try again!!!");
						return false;
					}
					
					agreement 			= this.productBlock.agreement;					
					
					//encrypt the public key with the recipient provided.
					if( this.details.transType == 'BUYPRODUCT' && this.details.productID &&  agreement.units > 0 ) {
						await this.setPublicKey( this.details.productID );
						agreement.units					-= 1;
						this.newBlock.agreement 		= agreement;
						
						if( ! this.newBlock.productID || this.newBlock.productID != this.details.productID ){
							this.newBlock.productID = this.details.productID;						
						}
						
						
					}
					else if( this.details.transType == 'PRODUCTSUB' && this.details.productID && agreement.units > 0 && ( ! this.#note.noteSubs[ this.details.productID ] || ! this.#note.noteSubs[ this.details.productID ].subUnit || this.#note.noteSubs[ this.details.productID ].subUnit > 0 ) ) {
						await this.setPublicKey( this.details.productID );
						
						//if the transaction is a new subscription, we deduct a unit from the original unit of the product
						//any one inheriting the product purchase will know that one unit of the product is already purchased
						if( ! agreement.subUnit )
							agreement.units					-= 1;
						
						if( ! this.details.subConfig ){
							this.details.subConfig 	= this.defaultSub;
						}
						
						if( this.#note.noteSubs[ this.details.productID ] ) {
							this.productBlockID 	= this.#note.noteSubs[ this.details.productID ].subsID;
							//a subscription product block returned
							//this block won't be deleted except the next subscription is triggered
							//the expiry date shpulg be set equal to or even greater than the nextSub time.
							let productBlock 		= await this.getTransBlock();
							
							if( ! productBlock || ! productBlock.agreement ){
								console.error("no Product Block related to your current subscription. Subscription may be taken as new!");
							}
							
							agreement 		=  productBlock.agreement;
						}
						
						//add the subscription unit if not found.
						if( ! agreement.subUnit ){
							agreement.subUnit 					= Math.round( agreement.value / this.details.transValue );
							this.details.subConfig.value  		= this.details.transValue;
							let subTime 						= this.calculateTime( this.details.subConfig.subSpread );
							this.details.subConfig.nextSub 		= parseInt( await this.currentTime() ) + subTime;
							this.details.subConfig.productID 	= this.details.productID;
							this.details.subConfig.lastSub		= agreement.value % this.details.transValue;
							
							//ensuring the sub unit is well configured.
							let lastSub 						= this.details.subConfig.lastSub / this.details.transValue;
							
							if( lastSub < 0.5 ){
								agreement.subUnit 				+= 1;
							}
							
							if( this.details.subConfig.lastSub == 0 ){
								this.details.subConfig.lastSub 	= this.details.transValue;
							}
							
							this.details.subConfig.subUnit		=  agreement.subUnit;
							this.#note.noteSubs[ this.details.subConfig.productID ] = JSON.stringify( this.details.subConfig );
							agreement.subConfig 				= this.details.subConfig;
						}
						else {
							agreement.subUnit 				-= 1;
							let subTime 					= this.calculateTime( this.details.subConfig.subSpread );
							this.details.subConfig.nextSub 	= parseInt( await this.currentTime() ) + parseInt( subTime );
							this.$note.noteSubs[ this.details.subConfig.productID ] 	= this.details.subConfig;
							
							agreement.subConfig				= this.details.subConfig;
						}				
					}
					//this is an helper block for note'this.s who triggered a subscription transaction when there
					else if( this.details.transType == 'PRODUCTSUB' && this.#note.noteSubs[ this.details.productID ] && this.#note.noteSubs[ this.details.productID ].subUnit && this.#note.noteSubs[ this.details.productID ].subUnit <= 0 ){
						this.newBlock.transType = 'UPDATE';
						this.newBlock.transValue = 0;					
						delete this.#note.noteSubs[this.details.productID ];
					}
					
					if( this.details.transType == 'PRODUCTSUB' || this.details.transType == 'BUYPRODUCT' ) {
						//if we have the most current block, let'this.s calculate the productIDs
						//if our peoductIDs coincide with that of another block, the recipient note will help us 
						//adjust base on the transaction time.
						this.#note.noteSecret	= this.productBlock.productID;
						this.string 			= this.newBlock.blockID + this.productBlock.productID;
						this.newBlock.productBlockID 		= await this.hashed();
						this.newBlock.productFormerBlockID 	= this.productBlock.productBlockID;
						
						this.newBlock.agreement 			= agreement;
						
						//this will help us query the block that holds the last subscription.
						if( this.details.transType == "PRODUCTSUB" ){
							if( this.#note.noteSubs[ this.details.productID ] )
								this.#note.noteSubs[ this.details.productID ].subsID 	= this.newBlock.productBlockID;
							
							else {
								//create the subscription on the note
								//the subscription is expected to have been configured by the user before
								//running this function
								this.#note.noteSubs[ this.details.productID ] = JSON.parse( JSON.stringify( this.subConfig ) );
								this.#note.noteSubs[ this.details.productID ].subsID  = this.newBlock.productBlockID;
							}
						}
					}
				}				
				
				//before encrypting the budget let'this.s add references to our block
				privKey 				= await this.generateKey( 20 );
				await this.setPrivateKey( privKey );
				this.newBlock.blockRef	= await this.getPublicKey();
				this.newBlock.signRef	= await this.generateKey( 20 );
				agreement.privateKey		= privKey;
				await this.setPublicKey( this.details.recipient );
				this.newBlock.recipient = await this.#encrypt( JSON.stringify( agreement ) );
				this.newBlock.transType = this.details.transType;
				
				if( this.autoExecute && this.details.blockRef ){
					this.newBlock.blockRef 	= this.details.blockRef;
				}
			}
			//to recieve a transaction, the send block must be set in the response handler and the send block must have 
			//transaction type that equal send.
			else if( ( this.transRecieve.includes( this.details.transType ) ) && this.response && ( this.transSend.includes( this.response.transType ) || ( this.response.transType == "DEPOSIT" && this.fiatCurrencies[ this.#note.noteType.slice( 0, this.#note.noteType.lastIndexOf("CRD") ) ] ) ) ){
				
				
				//a recieved transaction is not connected to a product details
				if( this.newBlock.productID ){
					delete this.newBlock.productID;
				}
				
				//a recieved transaction is not connected to a budget details
				if( this.newBlock.budgetID ){
					delete this.newBlock.budgetID;
				}
				
				//the recipient must be the same as the response.
				if( ! this.details.recipient || this.details.recipient != this.response.recipient )
					this.details.recipient 		= this.response.recipient;
				
				//the first private key to use when recieving a transaction is the note secret.
				await this.setPrivateKey( this.#note.noteSecret );				
				agreement = await this.#decrypt( this.details.recipient );
				
				if( ! await this.isJsonable( agreement ) ){
					await this.setPrivateKey( this.#note.blockKey );
					agreement 	= await this.#decrypt( this.details.recipient );
				}
				
				//configure the blockID in the details too.
				if( ! this.details.blockID || this.response.blockID != this.details.blockID )
					this.details.blockID 		= this.response.blockID;
				
				if( ! this.details.blockID )
					return false;
				
				if( ! this.details.noteType || this.response.noteType != this.details.noteType )
					this.details.noteType 		= this.response.noteType;
				
				let blockIN 	= this.details.blockID.slice( 0, 5);
				
				if( this.block.recievedIDs && this.block.recievedIDs.indexOf( blockIN ) >= 0 ){
					console.error( "Block Already Recieved!!! Transaction Now Aborting" );
					return false;
				}
				else if( ! this.newBlock.recievedIDs ){
					this.newBlock.recievedIDs = [];
				}
				let transTime = this.response.transTime || this.details.transTime;
				let blockID 	= this.response.blockID || this.details.blockID;
				
				if( transTime == this.#note.recievedTime ) {
						console.error( "Block Already Recieved!!! Transaction Now Aborting" );
						return false;
				}
				else if( blockID == this.#note.recievedBlockID ){
					console.error( "Block Already Recieved!!! Transaction Now Aborting" );
					return false;
				}		
				
				let noteType 			= this.response.noteType || this.details.noteType;
				
				if( await this.isJsonable( agreement ) && noteType == this.#note.noteType ){				
					
					//trying to extract private key from the agreement handler.
					agreement 	= JSON.parse( agreement );
					this.signKey = agreement.privateKey;
					await this.setPrivateKey( this.signKey );
					this.pubKey = await this.getPublicKey();
					
					if( this.pubKey != this.response.blockRef && this.response.nextBlockID != "AUTOEXECUTE"){
						console.error("This block is invalid!!! the reference key is not equal with key supplied! Your Recieved Block Reference: " + this.response.blockRef + ". Recieved Transaction Now Aborting!!!");
						return false;
					}
					else if( this.response.nextBlockID == "AUTOEXECUTE" && this.details.agreement ){
						this.signKey 	= this.details.agreement.privateKey;
						await this.setPrivateKey( this.signKey );
						this.pubKey 		= await this.getPublicKey();
						
						if( this.newBlock.agreements[ agreement.agreeID ] ){
							delete this.newBlock.agreements[agreement.agreeID];
						}
						//block with the autoKey handler would be noted in the network to be an auto generated transaction.
						 this.signTxt 		= this.response.signRef;
						this.newBlock.autoKey	= await this.getPublicKey();
						this.newBlock.blockRef	= this.response.blockRef;
					}
					let privateKey = agreement.privateKey;
					delete agreement.privateKey;
					//storing the agreement this way on the block makes it executable
					//by any node in the network.
					//the reciepient note will not be able to recieve the block transaction
					//more than once because the transaction will be referenced to the 
					//current block, re recieving the funds means having two or more 
					//blocks in the network having the same reference key, that will be
					//invalid, so scriptbill default behaviour is to do away with the 
					//first private key of the agreement to prevent the note from
					//re recieving agreements again.
					//we won't add the agreement back to the new block is it is autogenerated, except the agreement is
					//period.
					if( this.response.nextBlockID != "AUTOEXECUTE" || agreement.isPeriodic )
						this.newBlock.agreements[agreement.agreeID] = agreement;
					
					this.newBlock.agreement 	= agreement;
					
					//lastly, before we recieve the transaction block, we have to test if the recipient is ready to recive
					//the transaction based on the connected agreement.
					if( this.details.transType == 'RECIEVE' && this.response.nextBlockID != "AUTOEXECUTE" ) {
					
						let conf = confirm('You are about recieving ' + this.details.transValue + ' and the details on the agreement: agreement value = ' + agreement.value + '; the agreement will end in: ' + this.timeToString( agreement.execTime ) + '; You\'ll be given a grace of: ' + this.timeToString( agreement.maxExecTime - agreement.execTime ) + '; The Payment is ' + ( agreement.isPeriodic ? 'going to be periodic and the periodic times will be ' + agreement.times + ' with an interest rate of ' + agreement.interestRate + ' which will be calculated as a ' + agreement.interestType + ' interest and would be calculated every ' + agreement.interestSpread : 'not going to be periodic' ) +  '. Do you which to continue recieving Scriptbill transaction or click cancel to cancel the transaction? ' );
							
						if( ! conf ){ 
							console.error( this.response.blockID + " Recieved Transaction Now Being Cancelled!!!");
							//create a transaction block to cancel the transa
							this.details.transType 	= "CANCELLED";
							this.details.recipient 	= this.response.blockKey;
							this.details.transValue = this.response.transValue;
							this.details.noteValue 	= this.#note.noteValue;
							this.details.noteType	= this.#note.noteType;
							this.details.agreement 	= agreement;
							//adding the block reference to be sure.
							this.details.agreement.privateKey = privateKey;
							this.details.blockRef 	= this.response.blockRef;
							return await this.generateScriptbillTransactionBlock();
							return false;
						}
					
					}
					
				}
				//now if the noteType that would recieve this transaction is not the same note type as 
				else if(  await this.isJsonable( agreement ) && noteType != this.#note.noteType ){
					let conf = confirm('You are about recieving ' + this.details.transValue + ' with a Credit Type of: ' + this.details.noteType + '. To Recieve Scriptbill Credit you need to create a new Scriptbill Note of Scriptbill type. Do you Wish to Continue?' );
						
					if( ! conf ) {
						let noteAdd = prompt('Please enter the note Address to recieve Scriptbill credit. Cancel if you don\'t want to recieve Scriptbill credit or you want to exchange Scriptbill credit directly!!!');
						
						if( noteAdd != null ){
							this.details.recipient = noteAdd;
							this.#note.noteValue 	+= this.details.transValue;
							let type 				= this.#note.noteType;
							this.#note.noteType 	= noteType;
							this.details.transType 	= "SEND";
							this.details.agreement 	= JSON.parse( agreement );
							return await this.generateScriptbillTransactionBlock();
							this.#note.noteType 	= type;
							if( this.#saveNote )
								await this.saveNote();
							return;
						}
						else {
							if( ! this.response )
								this.response = this.details;
							
							this.exchangeCredits();
						}
					
					} else {
						//save the current note ro preserve the note'this.s information
						//then create a new note th
						if( this.#saveNote )
							await this.saveNote();
						agreement 							= JSON.parse( agreement );
						this.defaultBlock 					= JSON.parse( JSON.stringify( this.details ) );
						this.defaultBlock.agreement 		= agreement;
						this.defaultScriptbill.noteType 	= this.details.noteType;
						this.defaultScriptbill.noteServer 	= this.details.noteServer;
						this.defaultScriptbill.walletID		= this.#note.walletID;
						this.createNewScriptbillWallet();
						return false;
					}
				}
				//else if the agreement was not properly decrypted, we check other possible private keys in the note.
				else {
					//before returning, we test other private keys that exists on Scriptbill note that can be used to send data to Scriptbill note.
					//first test the note products, incase the note is selling a product.
					let products = this.#note.noteProducts;
					if( typeof products == 'object' ){						
						for( x = 0; x < products.length; x++ ){
							privKey = products[x];
							await this.setPrivateKey( privKey );
							agreement = await this.#decrypt( this.details.recipient );
							if( await this.isJsonable( agreement ) ){
								if( noteType != this.#note.noteType ){
									this.exchangeCredits();//BAAACK
									return;
								}
								agreement 	= JSON.parse( agreement );
								this.signKey = agreement.privateKey;
								delete agreement.privateKey;
								this.newBlock.agreements[ agreement.agreeID ] = agreement;
								break;
							}
						}					
					}
					//next we need to check the agreements the note has made whether it'this.s the transaction block offered in the details.
					if( typeof this.#note.agreements == 'object' ){
						for( x = 0; x < this.#note.agreements.length; x++ ){
							privKey = this.#note.agreements[x];
							await this.setPrivateKey( privKey );
							agreement = await this.#decrypt( this.details.recipient );
							if( await this.isJsonable( agreement ) ){
								if( noteType != this.#note.noteType ){
									this.exchangeCredits();
									return;
								}
								agreement = JSON.parse( agreement );
								this.signKey = agreement.privateKey;
								delete agreement.privateKey;
								delete this.#note.agreement[x];
								break;
							}
						}
					}
					
					//the profit keys are added to the note whenever the note makes a payment for a product
					//the profit keys will remain on the note as long as the block carrying the public key has 
					//not expired
					if( this.details.transType == 'PROFITRECIEVE' && this.response.transType == "PROFITSHARING" && this.#note.profitKeys && typeof this.#note.profitKeys == 'object' && this.#note.profitKeys.length > 0 ){
						for( x = 0; x < this.#note.profitKeys.length; x++ ){
							privKey = this.#note.profitKeys[x];
							await this.setPrivateKey( privKey );
							agreement = await this.#decrypt( this.details.recipient );
							if( await this.isJsonable( agreement ) ){
								if( noteType != this.#note.noteType ){
									this.exchangeCredits();
									return;
								}
								agreement = JSON.parse( agreement );
								this.signKey = agreement.privateKey;
								delete agreement.privateKey;
								break;
							}
						}
					}
					
					//we can stop recieveing if the agreement was not propely decrypted.
					if( typeof agreement != "object" || typeof this.signKey != "string" ){
						this.newBlock = undefined;
						return false;
					}
				}
				
				//this point we are confidence the note is actually recieving the transaction block
				//once the agreement is successfully decrypted, the note can now recieve the block convienently.
				this.#note.recievedBlockID = blockID;
				this.#note.recievedTime	  = transTime;
					
				this.newBlock.recievedIDs.push( blockID.slice(0, 5) );
					
				//the recieved id store can't take more than 10 kilobytes of data
				if( this.newBlock.recievedIDs.length > 2000 ) {
					delete this.newBlock.recievedIDs[ this.newBlock.recievedIDs.length - 1 ];
				}
				
				await this.setPrivateKey( this.signKey );
				
				if( this.response.nextBlockID != "AUTOEXECUTE" )
					this.newBlock.blockRef = await this.getPublicKey();
				
				else { 
					this.newBlock.blockRef 	= this.response.blockRef;
					this.newBlock.autoKey 	= await this.getPublicKey();
				}
				
				if( this.details.productID || this.response.productID ){
					this.details.origValue  = this.details.transValue;
					this.shareValue 		= ( this.details.transValue * agreement.sharingRate );
					this.details.transValue = this.details.transValue;
					this.titheValue 		= this.shareValue / 2;
					this.shareValue 		= this.shareValue / 2;
				}
				
				if( this.details.transType != 'STOCKRECIEVE' )
					this.#note.noteValue += this.details.transValue;
				
				else {
					
					//configuring the default stock note for the User.
					this.defaultScriptbill.walletID		= this.#note.walletID;
					this.defaultScriptbill.stockKey 	= agreement.transKey;
					this.defaultScriptbill.noteValue	= agreement.stock;
					this.defaultScriptbill.transValue	= agreement.pay;
					this.defaultScriptbill.noteType 	= agreement.budgetCredit;
					this.defaultScriptbill.motherKey 	= this.#note.noteAddress;
					let note 							= this.#note;
					
					if( this.details.budgetProducts && this.details.budgetProducts.length > 0 )					
						this.defaultScriptbill.stockProducts = this.details.budgetProducts;
					
					this.createNewScriptbillWallet();
					this.#note 		= note;
					return;					
				}
				
				//signing the agreement.
				 this.signTxt 		= await this.generateKey( 20 );
				agreement.recieverSign	= await this.Sign();
				agreement.recieverID	=  this.signTxt;
				agreement.recieverKey	= await this.getPublicKey();
				
				if( ! this.newBlock.agreements ||  typeof this.newBlock.agreements != "object" )
					this.newBlock.agreements = {};
				
				//configuring the new block
				this.newBlock.agreements[agreement.agreeID] = agreement;
				this.newBlock.transType 	= this.details.transType;
				this.newBlock.transValue 	= this.details.transValue;
				this.newBlock.noteType 		= this.#note.noteType;
				this.newBlock.noteValue 	= this.#note.noteValue;
				
			}
			//handling other trnasactions apart from sending and recieving.
			else if( this.otherTrans.includes( this.details.transType ) ){
				if( this.details.transType == 'CREATEPRODUCT' ) {
					//first configure the product ID
					let productKey 			= await this.generateKey(20);
					
					if( this.productKey ){
						console.log( "product key set: " + this.productKey );
						productKey = this.productKey;
					}
					
					await this.setPrivateKey( productKey );
					this.newBlock.productID = await this.getPublicKey();
					
									
					if( this.#note.noteProducts && this.#note.noteProducts.length > 0 ) {
						let product = this.#note.noteProducts[0];
						await this.setPrivateKey( product );
						this.productID = await this.getPublicKey();
						let prodBlock = await this.getTransBlock();
						
						if( prodBlock && prodBlock.budgetID ){
							this.newBlock.budgetID = prodBlock.budgetID;
							this.newBlock.budgetProducts 	= prodBlock.budgetProducts;
						}
					}				
					//trying to get the budget id which this product will be under.
					else if( this.#note.noteBudgets && this.#note.noteBudgets.length > 0 ){
						let budgets = this.#note.noteBudgets, budget;
						for( x = 0; x < budgets.length; x++ ){
							budget = budgets[x];
							await this.setPrivateKey( budget );
							this.budgetID = await this.getPublicKey();
							budget 		= await this.getTransBlock();
							budget 		= budget[0];
							
							if( budget && ( budget.budgetType == 'business') ){
								this.newBlock.budgetID = this.budgetID;
								//get the xcurrent budget block.
								budget 	= await this.getCurrentBlock( budget );
								this.newBlock.budgetProducts 	= budget.budgetProducts;
								break;
							}
						}
					}
					
					//save the key in the current note.
					this.#note.noteProducts.push( productKey );
					
					if( ! this.newBlock.budgetProducts ){
						this.newBlock.budgetProducts 	= [];
					}
					
					this.newBlock.budgetProducts.push( this.newBlock.productID );
										
					//create the note'this.s block IDs
					this.string 						= this.newBlock.blockID + this.newBlock.productID;
					this.newBlock.productBlockID 		= await this.hashed();
					this.newBlock.productFormerBlockID	= "";
					
					//add the business manager key to the block as a refferal.
					if( this.#note.BMKey ){
						this.newBlock.businessKey		= this.#note.BMKey;
					}
					
					else {
						this.newBlock.businessKey		= this.#note.noteAddress;
					}
					
					//add the value of the product as the transaction value of the product.
					this.newBlock.transValue			= this.details.transValue;
					this.newBlock.transType				= this.details.transType;
					
					//add the product details as agreement to the block.
					this.newBlock.agreement 			= this.details.agreement;
				}
				//create product transaction.
				else if( this.details.transType == "CREATEBUDGET" ){
					
					if( ! this.details.budgetID ){
						privKey = await this.generateKey(20);
						await this.setPrivateKey( privKey );
						this.#note.noteBudgets.push( privKey );
						this.details.budgetID = await this.getPublicKey();
					} else {
						if( ! this.#note.noteBudgets.includes( this.details.budgetID ) )
							this.#note.noteBudgets.push( this.details.budgetID );
						
						this.setPrivateKey( this.details.budgetID );
						this.details.budgetID 		= await this.getPublicKey();
					}					
					
					//testing the type of the budget,
					if( this.details.agreement.budgetType &&  this.details.agreement.budgetType == 'business' ) {
						let products = this.#note.noteProducts;
						let x, product, productID, productBlock;
						if( ! this.newBlock.budgetProducts )
							this.newBlock.budgetProducts = [];
						for( x = 0; x < products.length; x++ ){
							product = products[x];
							await this.setPrivateKey( product );
							this.productID = await this.getPublicKey();
							productBlock = await this.getTransBlock();
							
							if( productBlock ){
								this.newBlock.budgetProducts.push( this.productID );
							}
						}
					} else if( this.details.agreement.budgetType == "governmental" && this.details.agreement.stockID ){
						this.newBlock.noteType 		= this.details.agreement.stockID;
						//creating the exchange note.
						let exchangeNote 			= this.newBlock.exchangeNote;
						privKey 					= await this.generateKey( 40 );
						this.setPrivateKey( privKey );
						exchangeNote.exchangeID 	= await this.getPublicKey();
						exchangeNote.exchangeKey	= privKey;
						exchangeNote.noteType		= this.newBlock.noteType;
						exchangeNote.motherKey 		= this.#note.noteAddress;
						
						//generate the first exchange block ids.
						let notesecret 					= this.#note.noteSecret;
						this.#note.noteSecret 			= exchangeNote.exchangeKey;
						this.seed 						= await this.generateKey();
						this.newBlock.exFormerBlockID 	= this.seed;
						this.newBlock.exBlockID 		= await this.calculateNextBlockID();
						this.seed 						= this.newBlock.exBlockID;
						this.newBlock.exNextBlockID 	= await this.calculateNextBlockID();
						this.#note.noteSecret 			= notesecret;
						
						//next check if the budget is a Scriptbank budget.
						let testType 					= this.#note.noteType.slice( 0, this.#note.noteType.lastIndexOf("CRD") );
						if( this.fiatCurrencies[ testType ] || this.#note.noteType == "SBCRD" ){
							this.#saveNote = false;
							await this.getData("saveNote", JSON.stringify( this.#note ), this.#default_scriptbill_server );
						}
					}
					
					this.newBlock.budgetID 		= this.details.budgetID;
					this.newBlock.agreement 	= this.details.agreement;
					
					if( this.details.agreement.budgetCredit )
						this.newBlock.budgetCredit 	= this.details.agreement.budgetCredit;
					else
						this.newBlock.budgetCredit 	= this.#note.noteType;
					
					this.newBlock.expiry 		= Infinity;
				}
				//for quote bond transa type.
				if( ( this.details.transType == "QUOTESTOCK" || this.details.transType == "QUOTEBOND" ) && ( this.response.transType == "SOLDSTOCK" || this.response.transType == "SOLDBOND" ) ){
					//first decrypt the agreement handler.
					await this.setPrivateKey( this.#note.noteSecret );
					let recipient 	= this.response.recipient || this.details.recipient;
					agreement 		= await this.#decrypt( recipient );
					
					//was not successfully decrypted...
					if( ! await this.isJsonable( agreement ) ) return false;
						
					this.transType 		= "CREATEBUDGET";
					this.budgetID 		= this.response.budgetID || this.details.budgetID;
					this.budgetBlock 	= await this.getTransBlock();
						
					if( ! this.budgetBlock ){
						console.error("The budget ID " + this.budgetID + " was not found connected to any valid budget, Please try again with a differenct Budget ID");
						return false;
					}
					
					agreement 	= this.budgetBlock.agreement;
						
					//test the agreement to see if it is a valid budget configuration.
					if( agreement.budgetID != this.budgetID || ! agreement.investorsHub  ) return false;
						
					//the note will store all the stock note public key on the stockNote handler and that of bond on the
					//bondNote handler.
					//the stocknote handler on a Scriptbill note is not a preset handler, only appears on the note'this.s
					//variable when the note has started to invest on stocks.
					let noteAddress, hash, isQuoted = false;
					if( this.details.transType == "QUOTESTOCK" && this.#note.stockNotes && this.#note.stockNotes.length > 0 ) {
						let x, stockNote;
						for( x = 0; x < this.#note.stockNotes.length; x++ ){
							stockNote 	= this.#note.stockNotes[x];
							this.string = stockNote.hash;
							hash 		= await this.hashed();
							if( ! agreement.investorsHub.includes( hash ) ) {
								hash 		= false;
								continue;
							}
							
							noteAddress 	= stockNote.address;
							delete this.#note.stockNotes[x];
							delete agreement.investorsHub[ agreement.investorsHub.indexOf( hash ) ];
							isQuoted 		= true;
						}
					}
					else if( this.details.transType == "QUOTEBOND" && this.#note.bondNotes && this.#note.bondNotes.length > 0 ) {
						let x, bondNote;
						for( x = 0; x < this.#note.bondNotes.length; x++ ){
							bondNote 	= this.#note.bondNotes[x];
							this.string = bondNote.hash;
							hash		= await this.hashed();
							if( ! agreement.investorsHub.includes( hash ) ){
								hash 	= false;
								continue;
							}
							
							noteAddress 	= bondNote.address;
							delete this.#note.bondNotes[x];
							delete agreement.investorsHub[ agreement.investorsHub.indexOf( hash ) ];
							isQuoted 		= true;
						}
					}
					
					if( ! noteAddress ){
						agreement.transKey = await this.generateKey( 20 );
						
						await this.setPrivateKey( agreement.transKey );
						noteAddress = await this.getPublicKey();
					}
					
					let stockNote = {};
					
					if( noteAddress ) {
						stockNote.address = noteAddress;
					}
					
					//before encrypting the agreement for the recipient, let'this.s add the recipient
					//as a valid investor to the budget.
					
					if( this.response.transType == "QUOTESTOCK" ){
						if( hash )
							this.string 			= noteAddress + this.details.agreement.pay.toString() + this.details.agreement.stock.toString() + hash;
						else 
							this.string 			= noteAddress + this.details.agreement.pay.toString() + this.details.agreement.stock.toString();
					}
					
					else if( this.response.transType == "QUOTEBOND" ) {
						if( hash )
							this.string 			= noteAddress + this.details.transValue.toString() + hash;
						
						else 
							this.string 			= noteAddress + this.details.transValue.toString();
					}
					
					
					this.string 			= await this.hashed();
					stockNote.hash			= this.string;
					agreement.investorsHub.push( await this.hashed() );
					
					//we direct the transaction to the stock note.
					if( noteAddress ){
						await this.setPublicKey( noteAddress );
						this.signKey 			= await this.generateKey( 20 );
						agreement.privateKey 	= this.signKey;
						 this.signTxt 			= await this.generateKey(20);
						this.newBlock.signRef	=  this.signTxt;
						this.newBlock.blockRef 	= await this.Sign();
						this.newBlock.recipient = await this.#encrypt( agreement );
						//help the network quickly discover this block using the budget id.
						this.newBlock.budgetID 	= this.details.budgetID;
					}
					else {
					
						//save the current note so that we can configure the stock note already.
						this.#note.blockID 		= this.newBlock.blockID;
						if( this.#saveNote )
							await this.saveNote();
						
						this.noteAddress		= this.#note.noteAddress;
						this.#currentNote  		= this.#note;
						this.#note 				= this.defaultScriptbill;
						this.#note.noteAddress  = noteAddress;
						this.#note.noteValue 	= this.details.agreement.pay;
						this.#note.stock		= this.details.agreement.stock;
						this.#note.motherKey 	= this.noteAddress;
						this.#note.transValue 	= this.details.transValue;
						this.#note.noteType		= this.details.agreement.stockID;//this also contains the bondkey for bond
						this.#note.noteServer	= this.#default_scriptbill_server;
						this.#note.walletID		= this.walletID;
						this.#note.blockID		= this.newBlock.blockID;
						this.#note.budgetID 	= this.budgetID;
						this.#note.budgetValue	= agreement.value;
					}
					//the main data that will be transaferred to the recipient will be deleted
					//before adding the budget data to a public view in the agreement handler.
					delete agreement.transKey;
					delete agreement.stock;
					delete agreement.pay;
					delete agreement.privateKey;
					
					this.newBlock.agreement 	= agreement;
					this.newBlock.transValue 	= this.detils.transValue;
					this.newBlock.transType 	= this.details.transType;
					this.newBlock.noteValue 	= this.#note.noteValue;
					this.newBlock.noteType 		= this.#note.noteType;			
				}
				else if( this.details.transType == "SOLDBOND" || this.details.transType == "SOLDSTOCK" || this.response.transType == "BUYSTOCK" || this.response.transType == "BUYBOND" || this.response.transType == "INVEST" ) {
					if( this.response && this.response.transType == this.details.transType ) {
						
						if( this.response.transType == "BUYBOND" )
							this.details.transType = "SOLDBOND";
						
						else if( this.response.transType == "INVEST" )
							this.details.transType 	= "INVESTRECIEVE";
						
						else
							this.details.transType 	= "SOLDSTOCK";
					}
					
					//most of the time the blockKey is what is used to make the transaction not the noteAddress because
					//it is a public exchange transaction. But ofr a credit note type, it must be the note that created
					//the budget. So we use the note'this.s budget private keys to verify that the transaction was pointing to us.
					let x, agree;
					for( x = 0; x < this.#note.noteBudgets.length; x++ ){
						await this.setPrivateKey( this.#note.noteBudgets[x] );
						agree 		= await this.#decrypt( this.response.recipient );
						
						if( ! await this.isJsonable( agree ) ) continue;
						
						privKey 		= this.#note.noteBudgets[x];
						agreement 		= JSON.parse( agree );
						break;
					}

					//testing the budget id.
					this.budgetID 	= await this.getPublicKey();
					this.transType 	= "CREATEBUDGET";
					this.budgetBlock = await this.getTransBlock()[0];//will always return an array of transaction blocks
					
					if( ! this.budgetBlock ) return false;
					
					if( this.details.transType == "SOLDBOND" && ( ! this.budgetBlock.agreement || this.budgetBlock.agreement.budgetType != "governmental" ) ) {
						console.error("Can't sell Bond without a governmental budget!");
						return false;
					} 
					else if( this.details.transType == "SOLDSTOCK" && ( ! this.budgetBlock.agreement || this.budgetBlock.agreement.budgetType != "straight" || this.budgetBlock.agreement.budgetType != "recursive" ) ){
						console.error("Can't sell Stock without a valid budget!");
						return false;
					}
					
					this.newBlock.noteValue 	= this.#note.noteValue;
					this.newBlock.transValue 	= this.response.transValue;
					
					//recieving the transaction value into the note.
					if( this.#note.noteType == this.response.noteType )
						this.#note.noteValue 			+= this.details.transValue;
					
					else {
						let exValue = await this.getExchangeValue( this.#note.noteType, this.response.noteType )[0];
						this.#note.noteValue 	+= (this.details.transValue * exValue );
					}
					
					let prodAgree = this.budgetBlock.agreement;
					let budgetValue = prodAgree.value;
					let rankFound = false;
					
					if( ! prodAgree.privateKey ) {
						console.error("No Private Key in the transaction agreement, This may hinder the verification for recieving this block. Investment Recieve Transaction Aborting!!!");
						return false;
					}
									
					//this is because the notte can have more than one ranks
					if( prodAgree.companyRanks && this.#note.companyRanks && typeof this.#note.companyRanks == 'object' ) {
						let ranks = this.#note.companyRanks;
						let q;
										
						for( q = 0; q < ranks.length; q++ ) {
							privKey = ranks[q];
							await this.setPrivateKey( privKey );
							pubKey  = await this.getPublicKey();
							await this.setPrivateKey( pubKey );
							pubKey  = await this.getPublicKey();
										
							//compare the pubkey gotten with the companyRank key
							//supplied.
							if( prodAgree.companyRanks.includes( pubKey ) ) {
								rankFound = true;
								break;
							}
						}
					}
					let t, percent, stock, amount, total, pay;
					if( rankFound ) {
						t = prodAgree.workingPartner;
						percent = prodAgree.workingPartnerShare;
					} else {
						t = prodAgree.sleepingPartner;
						percent = prodAgree.sleepingPartnerShare;
					}
					//please note that the Pay Value is the total number of stock the user is allowed to hold based 
					//on the agreement of the company. While the stock value is the actual value of the client'this.s investment
					switch(t){
						case 'percent-high':
							amount  = this.details.transValue * percent;
							total  	= this.details.transValue + amount;
							pay 	= total / budgetValue;
							stock  	= this.details.transValue / budgetValue;
							break;
						case 'percent-low':
							amount 	= this.details.transValue * percent;
							total  	= this.details.transValue - amount;
							pay  	= total / budgetValue;
							stock   = this.details.transValue / budgetValue;
							break;
						case 'percent-equal':
							stock  	= this.details.transValue / budgetValue;
							pay 	= stock;
							break;
						case 'dividend-high':
							stock  	= this.details.transValue / budgetValue;
							pay 	= stock + percent;
							break;
						case 'dividend-equal':
							stock  	= this.details.transValue / budgetValue;
							pay 	= stock;
							break;
						case 'dividend-low':
							stock  	= this.details.transValue / budgetValue;
							pay 	= stock - percent;
							break;
						default :
							stock  	= this.details.transValue / budgetValue;
							pay 	= stock;
						break;
					}
					
					this.newBlock.transType 	= this.details.transType;
					prodAgree.pay 				= pay;
					prodAgree.stock				= stock;
					
					this.signKey 				= prodAgree.privateKey;
					 this.signTxt 				= this.response.signRef;
					this.newBlock.blockRef		= await this.Sign();
					this.newBlock.signRef		=  this.signTxt;
					this.newBlock.transValue	= this.details.transValue;
					await this.setPrivateKey( this.response.blockKey );
					delete prodAgree.privateKey;
					this.newBlock.recipient 	= await this.#encrypt( JSON.stringify( prodAgree ) );
					delete prodAgree.pay;
					delete prodAgree.stock;
					this.newBlock.agreement 	= prodAgree;
				} else if( this.details.transType == "EXCHANGE" && ( this.response && this.transSend.includes(  this.response.transType ) ) ) {
				
				console.log("Inside Exchange");
					
				let blockID 				= this.newBlock.blockID;
				let formerBlockID 			= this.newBlock.formerBlockID;
				let nextBlockID 			= this.newBlock.nextBlockID;
				let wID 					= this.newBlock.walletHASH;
				let fwID					= this.newBlock.formerWalletHASH;
				let nwID					= this.newBlock.nextWalletHASH;
				this.newBlock 				= JSON.parse( JSON.stringify( this.details ));
				this.newBlock.blockID 		= blockID;
				this.newBlock.formerBlockID = formerBlockID;
				this.newBlock.nextBlockID 	= nextBlockID;
				this.newBlock.walletHASH	= wID;
				this.newBlock.formerWalletHASH	= fwID;
				this.newBlock.nextWalletHASH	= nwID;
			
				if( ! this.details.sellCredit || ! this.details.buyCredit ) {
					console.error("Can't continue an Exchange Transaction Without Appropraite Credits!!!");
					return false;
				}
				
				
				this.noteTypeS  = this.details.buyCredit;
				let buyBlock	= await this.getTransBlock();
				this.sellCredit = this.details.sellCredit;
				let sellBlock 	= await this.getTransBlock();
				
				if( ! buyBlock ) {
					console.error("Can't buy Credit from a Credit not Included into Scriptbills. You can as well include it by Creating a Scriptbill Note with the Credit Information");
					return false;
				}
				
				//
				
				 if( this.response && this.response.transValue < this.details.transValue && this.transSend.includes( this.response.transType ) ){
					console.error("Your Transaction Block Value is Lesser Than The Requested Block Value. Exchange Transaction Now Aborting!!!");
					return false;
					
				}else if( this.response.blockID == this.#currentNote.blockID ){
					//this shows that the current note was the initiator of the exchange
					this.blockID			= this.#currentNote.blockID;
					let transBlock			= await this.getTransBlock();
					
					if( transBlock ){
						//to get the correct hash value of the transblock, we remove the variables,				
						this.string 		= JSON.stringify( transBlock );
						let transHash		= await this.hashed();
						this.string 		= JSON.stringify( this.#currentNote );
						let noteHASH 		= await this.hashed();
						let joinNote 		= this.response.noteHash + this.#currentNote.noteHash;
						let joinTrans 		= this.response.transHash 	+ this.#currentNote.transHash;
						
						if( joinNote != noteHASH && joinTrans != transHash ){							
							console.error("Exchange Error: Supply Transaction Not Verified!!");
							return false;
						} else if( this.response.transType != "DEPOSIT" ){
							//next is verify the recipient of the transaction.
							//if the transaction is not a fiat based transaction, then the exchange note should 
							//be the recipient.
							await this.setPrivateKey( this.response.exchangeNote.exchangeKey );
							agreement 		= await this.#decrypt( this.response.recipient );
							
							if( ! await this.isJsonable( agreement ) ){
								console.error("Exchange Error: Supply Transaction Not Verified!!");
								return false;
							}
						}
					} else {
						console.error("Exchange Error: Supply Transaction Not Verified!!");
					}
				}
				else if( this.response && this.response.recipient ){
					//we check if the response was initiate by another client but for this note.
					if( this.response.productID && ( this.response.transType == "BUYPRODUCT" || this.response.transType == "PRODUCTSUB" )){
						//this shows the note must have sold a product to acquire this credit he would love to
						//exchange.
						let x;
						for( x = 0; x < this.#note.noteProducts.length; x++ ){
							await this.setPrivateKey( this.#note.noteProducts[x] );
							agreement 		= await this.#decrypt( this.response.recipient );
							
							if( await this.isJsonable( agreement ) ){
								break;
							}
						}
						
						if( ! agreement || ! await this.isJsonable( agreement ) ){
							console.error("Error in Exhange: Product Transaction Block was not verified to be sold by your note to initiate this exchange.");
							return false;
						}
					}
					else if( this.response.productID && this.response.transType == "PROFITSHARING" ){
						//this shows the note is actually recieving a profit base transaction,
						let x;
						for( x = 0; x < this.#note.profitKeys; x++ ){
							await this.setPrivateKey( this.#note.profitKeys[x] );
							agreement 		= await this.#decrypt( this.response.recipient );
							
							if( await this.isJsonable( agreement ) ){
								break;
							}
						}
						
						if( ! agreement || ! await this.isJsonable( agreement ) ){
							console.error("Error in Exhange: Profit Sharing Transaction is not verified to be shared to your note...");
							return false;
						}
					}
					else {
						//test first with the note'this.s secret
						await this.setPrivateKey( this.#note.noteSecret );
						agreement 		= await this.#decrypt( this.response.recipient );
						
						if( ! await this.isJsonable( agreement ) ){
							//before returning the transaction we try the block keys.
							await this.setPrivateKey( this.#note.blockKey );
							agreement 		= await this.#decrypt( this.response.recipient );
							
							if( ! await this.isJsonable( agreement ) ){
								//then we try the budget keys if present.
								let x;
								for( x = 0; x < this.#note.noteBudgets.length; x++ ){
									await this.setPrivateKey( this.#note.noteBudgets[x] );
									agreement 	= await this.#decrypt( this.response.recipient );
									
									if( await this.isJsonable( agreement ) ) break;
								}
								
								if( ! agreement || ! await this.isJsonable( agreement ) ){
									console.error("Error in Exhange: Transaction Block is not verified to be sent to your Note...");
									return false;
								}
							}														
						}
					}
				}
				else if( ! this.response ){
					console.error("You Cannot Ignite an Exchange Transaction Without a Readiness to Supply Credits to the Exchange market!!!");
					return false;
				} else {
					let sellCredit;
					if( this.details.sellCredit.lastIndexOf("CRD") < 0 ){
						sellCredit 		= this.details.sellCredit;
					}
					else if( ( this.details.sellCredit.length - this.details.sellCredit.lastIndexOf("CRD") ) == 3 ){
						sellCredit = this.details.sellCredit.slice( this.details.sellCredit.lastIndexOf("CRD"),  this.details.sellCredit.length);
					}
					else {
						sellCredit = this.details.sellCredit;
					}			
				}
				
				//next is to bill the client
				//there are three ways to bill the client
				//first is to check the response variable, if the response is a Scriptbill block, and the
				//block is a send block already tested above, and the client can actually decrypt the recipient
				//handler, we accept it as a means of payment.
				if( this.response.blockID ){
					let verify 		= this.verifyData();
					
					if( ! verify && this.#note.noteType == this.details.sellCredit ) {
						delete this.response.blockID;
						return await this.generateScriptbillTransactionBlock();
					}
				}
				
				let secret;
				if( ! sellBlock || ! sellBlock.length || ! sellBlock[0].exBlockID ) {
					//generating the exchange keys and IDs
					this.newBlock.exchangeKey 	= await this.generateKey( 30 );
					await this.setPrivateKey( this.newBlock.exchangeKey );
					this.newBlock.exchangeID 	= await this.getPublicKey();
					
					//generating the exchange block IDs.
					secret = this.#note.noteSecret;
					this.#note.noteSecret 		= this.newBlock.exchangeKey;
					this.newBlock.exBlockID 	= await this.calculateNextBlockID();
					this.seed					= this.newBlock.exBlockID;
					this.newBlock.exNextBlockID = await this.calculateNextBlockID();
					this.newBlock.exFormerBlockID = "";
					this.#note.noteSecret 		= secret;
					
					//adding the totalUnits.
					this.newBlock.totalUnits 	= this.details.transValue;
				} else {
					sellBlock					= await this.getCurrentBlock( sellBlock );
					this.newBlock.exchangeKey = sellBlock.exchangeKey;
					this.newBlock.exchangeID  = sellBlock.exchangeID;
					
					//generating the exchange block IDs.
					secret 						= this.#note.noteSecret;
					this.#note.noteSecret		= this.newBlock.exchangeKey;
					this.seed 					= sellBlock.exBlockID;
					this.newBlock.exBlockID 	= await this.calculateNextBlockID();
					this.seed					= this.newBlock.exBlockID;
					this.newBlock.exNextBlockID	= await this.calculateNextBlockID();
					this.newBlock.exFormerBlockID = sellBlock.exBlockID;
					
					//adding the total units.
					this.newBlock.totalUnits 	= parseInt( sellBlock.totalUnits ) + parseInt( this.details.transValue );
				}				
			}else if( this.details.transType == "UPDATE" || this.details.transType == "UPDATEBUDGET" || this.details.transType == "DEPOSIT" || this.details.transType == "WITHDRAW" ){
				let uBlockID = this.newBlock.blockID;
				let uNextBlockID = this.newBlock.nextBlockID;
				let uFormerBlockID = this.newBlock.formerBlockID;
				let uWalletHash 	= this.newBlock.walletHASH;
				let uNextWalletHash = this.newBlock.nextWalletHASH;
				let uFormWalletHash = this.newBlock.formerWalletHASH;
				
				this.newBlock   			= this.details;
				this.newBlock.blockID		= uBlockID;
				this.newBlock.nextBlockID	= uNextBlockID;
				this.newBlock.formerBlockID	= uFormerBlockID;
				this.newBlock.walletHASH	= uWalletHash;
				this.newBlock.formerWalletHASH = uFormWalletHash;
				this.newBlock.nextWalletHASH	= uNextWalletHash;
				this.newBlock.transValue    = 0;
				this.newBlock.noteValue 	= this.#note.noteValue;
				this.newBlock.noteType		= this.#note.noteType;
				
				console.log("newblock deposit: " + JSON.stringify( this.newBlock ));
				
				//checking things that has updated in the details that are not updated in the note.
				if( this.details.businessKey && this.details.businessKey != this.#note.BMKey ){
					this.#note.BMKey = this.details.businessKey;
				}
				 if( this.details.noteServer && this.details.noteServer != this.#note.noteServer ){//LOOKBACK
					this.#note.noteServer = this.details.noteServer;
				}
				 if( this.details.interestRate && this.details.interestRate != this.#note.interestRate ){
					this.#note.interestRate 	= this.details.interestRate;
				}
				
				if( this.details.interestType && this.details.interestType != this.#note.interestType ) {
					this.#note.interestType 	= this.details.interestType;
				}
				
				if( this.details.transType == "WITHDRAW" ){
					this.#note.noteValue -= this.details.transValue;
					this.newBlock.withdrawAccount = this.#note.withdrawAccount;
				}
				
				if( this.details.transType == "DEPOSIT" && this.details.recipient ){				
					
					delete this.newBlock.agreement;
					
					this.#note.noteValue += this.details.transValue;
					
					if( ! this.details.agreement )
						this.details.agreement = JSON.parse( JSON.stringify( this.defaultAgree ) );
					
					if( this.details.agreement ){
						
						if( ! this.details.agreement.execTime ) {
							this.details.agreement.execTime 	= parseInt( await this.currentTime() ) + parseInt( this.calculateTime( "3 Days" ) );
						}
						
						if( ! this.details.agreement.value || this.details.agreement.value < this.details.transValue )
							this.details.agreement.value 	= this.details.transValue;
						
						privKey								= await this.generateKey(30);
						await this.setPrivateKey( privKey );
						this.details.agreement.privateKey 	= privKey;
						
						//NOT REALY PART OF THE CODE, JUST ADDING IT FOR DEBUG PURPOSE THANKS.
						if( location.origin.includes("scriptbank") && ( location.href.includes("checkout") || this.#isExchangeDeposit ) ){
							this.s.depositKey 		= privKey;
						}
						
						this.newBlock.blockRef				= await this.getPublicKey();
						this.newBlock.signRef				= await this.generateKey(20);
						await this.setPublicKey( this.details.recipient );
						this.newBlock.recipient 			= await this.#encrypt( JSON.stringify( this.details.agreement ) );
						console.log("newBlock Deposit Agreement: " + JSON.stringify( this.newBlock ), " The Agreement if found: " + JSON.stringify( this.details.agreement ));
						this.newBlock.agreement = JSON.parse( JSON.stringify( this.details.agreement ) );
						
						if( this.newBlock.agreement.agreeID == "" ) {
							this.newBlock.agreement.agreeID = await this.generateKey(15);
						}
						
					}
					
				}
				
			}else if( this.details.transType == "AGREEMENTREQUEST" ){
				//ONLY FOR THE MEAN TIME. THIS IS REQUIRED TO CHECK IF THE CLIENT HAS THE 
				//AGREEMENT BEFORE RUNNING THE REQUEST
				/* if( ( ! this.newBlock.agreements && ! this.newBlock.agreeements[ this.details.agreement.agreeID ] ) ) {
					console.error("No Agreement with the agreement ID " + this.details.agreement.agreeID + " Was Found in your Note'this.s Personal Database. Please Check The ID and Try AGain.");
					return false;
				} */
				
				if( this.details.agreement.agreeID != this.details.recipient ){
					console.error( "Can't run an agreement request without using the ID as recipient. Script automatically reverting to the agreement ID" );
					this.details.recipient = this.details.agreement.agreeID;
				}
				
				//we will try removing the agreement from the personal database of this note to create
				//the request, if rejected, the network will not regard that the agreement was deleted
				//from the database.
				
				delete this.newBlock.agreements[ this.details.agreement.agreeID ];
				
				await this.setPublicKey( this.details.recipient );
				privKey								= await this.generateKey(25);
				this.details.agreement.privateKey 	= privKey;
				this.newBlock.recipient = await this.#encrypt( JSON.stringify( this.details.agreement ) );
				await this.setPrivateKey( privKey );
				this.newBlock.blockRef 	= await this.getPublicKey();
				this.newBlock.signRef	= await this.generateKey(20);
				this.newBlock.transType 	= this.details.transType;
				this.newBlock.transValue    = this.details.transValue;
				this.newBlock.noteType 		= this.#note.noteType;
				this.newBlock.noteValue 	= this.#note.noteValue;
			}
			//the opposite of the AGREEMENTREQUEST transaction is the AGREEMENTSIGN transaction
			//the transactions are used to clear an agreement from the Scriptbill database system
			//to prevent it from running. The agreement once signed will be deleted from the requesters
			//database system.
			else if( this.details.transType == "AGREEMENTSIGN" ){
				if( ! this.response || this.response.transType != "AGREEMENTREQUEST" ) {
					console.error("Can't Sign an Agreement without a valid Agreement Request!");
					return false;
				}
				let agreeements = this.#note.agreements, x, agreeKey, runned = false;
				
				//since the agreement ID is used to encrypt the agreement request, the recipient
				//must be the holder of the private key of the request.
				//now looping through the agreements handler to find the key.
				for( x = 0; x < agreements.length; x++ ) {
					agreeKey  = agreements[x];
					await this.setPrivateKey( agreeKey );
					agreement = await this.#decrypt( this.details.recipient );
					
					if( ! agreement || ! await this.isJsonable( agreement ) ) continue;
					
					runned = true;
					agreement = JSON.parse( agreement );
					privKey 	= agreement.privateKey;
					
					//first confirm from the user if he/she would want to sign the agreement for the user.
					conf 			= confirm("Would you like to sign this agreement request, with ID " + agreement.agreeID + "? Please ensure that all details in the agreement are fulfilled before continuing.");
					
					if( conf ){
						this.signText = agreement.agreeID;
						this.signKey  = privKey;
						agreement.agreeSign = await this.Sign();
						this.signText 		= this.response.signRef;
						this.newBlock.signRef = await this.Sign();
						await this.setPrivateKey( privKey );
						this.newBlock.blockRef 	= await this.getPublicKey();
					}
					else {
						runned = false;
					}
				}
				
				if( ! runned ){
					return false;
				}
				
				this.newBlock.noteType     = this.#note.noteType;
				this.newBlock.noteValue 	= this.#note.noteValue;
				this.newBlock.transValue 	= 0;
				this.newBlock.transType     = "AGREEMENTSIGN";
			}
				 
			}
		}
		//this block are for transactions that can only be handled by stock note types.
		else if( await this.testNoteType("STK") ) {
			if( this.details.transType == "SOLDSTOCK" || this.response.transType == "BUYSTOCK" ) {
					if( this.response && this.response.transType == this.details.transType ) {
						
						if( this.response.transType == "BUYBOND" )
							this.details.transType = "SOLDBOND";
						
						else
							this.details.transType 	= "SOLDSTOCK";
					}
					
					//most of the time the blockKey is what is used to make the transaction not the noteAddress because
					//it is a public exchange transaction.
					await this.setPrivateKey( this.#note.blockKey );
					agreement = await this.#decrypt( this.response.agreement );
					
					if( ! await this.isJsonable( agreement ) ) return false;
					
					this.budgetID 		= this.#note.budgetID;
					this.transType 		= "CREATEBUDGET";
					this.budgetBlock 	= await this.getTransBlock()[0];
					
					if( ! this.budgetBlock ){
						console.error("Can't sell Scriptbill Stocks or Bond without a valid Scriptbill Budget.");
						return false;
					}
					
					//next create a transaction block that will target the mother note
					//the transaction type will INVEST transType. the note will recieve the investment funds
					//and create a SOLDSTOCK transaction to the initiator'this.s note, which will create a QUOTESTOCK
					//transaction to either create the stock note or update an existing stock note.
					//first we save the block IDs in the newBlock
					let blockID				= this.newBlock.blockID;
					let nextBlockID 		= this.newBlock.nextBlockID;
					let formerBlockID 		= this.newBlock.formerBlockID;
					let walletHash			= this.newBlock.walletHASH;
					let nextWalletHASH 		= this.newBlock.nextWalletHASH;
					let formerWalletHASH 	= this.newBlock.formerWalletHASH;
					//this will help preserve the blockRefs and other important info on the block which will be 
					//used by the mother note to prepare the SOLDSTOCK transaction.
					this.newBlock			= this.response;
					//set the mother note Key as public key to encrypt the agreement;
					await this.setPublicKey( this.#note.motherKey );
					//not parsed yet
					this.newBlock.recipient	= await this.#encrypt( agreement );
					//adding the blockIDs
					this.newBlock.blockID 			= blockID;
					this.newBlock.nextBlockID		= nextBlockID;
					this.newBlock.formerBlockID 	= formerBlockID;
					this.newBlock.walletHASH		= walletHash;
					this.newBlock.formerWalletHASH	= formerWalletHASH;
					this.newBlock.nextWalletHASH	= nextWalletHASH;
					
					//ensure the transType is an INVEST transType so that the program can interprete the details 
					//as INVESTRECIEVE treansType. this transType occurs when a stock or bond note is redirecting a 
					//transaction to her mother note.
					this.newBlock.transType 		= "INVEST";
					
				}
				else if( this.details.transType == "SELLSTOCK" || this.response.transType == "BUYSTOCK" ){
					this.transType 		= "CREATEBUDGET";
					this.budgetID 		= this.#note.budgetID;
					this.budgetBlock 	= await this.getTransBlock()[0];
					let budget 			= this.budgetBlock.agreement;
					let totalValue, Pay;
					//check the stock value. If not equal then we only reconfigure the pay.
					if( this.details.stock != this.#note.noteValue )
						this.details.stock 	= this.#note.noteValue;
					
					if( this.response.transType == "BUYSTOCK" ){
						//this transaction will be directed to the stock note address
						//because no one can direct a BUYSTOCK transaction to a stock note directly
						//without knowing the noteAddress.
						await this.setPrivateKey( this.#note.noteSecret );
						agreement 	= await this.#decrypt( this.response.recipient );
						
						if( ! await this.isJsonable( agreement ) ){
							return false;
						}
						
						//before continuing alert the recipient first.
						let trade = confirm("Hello, a Scriptbill User with note Credit " + this.response.noteType + " and Transacting with Value of " + this.response.transValue +" Want'this.s to Buy Stock From your note. Please Cancel This Transaction if you are not willing to sell your stock now.");						
						this.details 		= this.response;
						
						if( ! trade ){
							//instead of cancelling the transaction we redirect the transaction to the
							//original budget block.
							this.details.recipient = this.budgetID;
						} else {						
							this.details.transType = "SOLDSTOCK";
							this.details.recipient = this.response.blockKey;
						}
					}
					
					//the stock value of a stock note is the total value of your investment in the budget in rates.
					//the pay value is the actual value of your investment vbased on the agreement on the budget.
					//your stock value is important when trying to sell your stock or bonds.
					//to calculate the actual stock, we have to calculate the budget value when the note invested on
					//the stock.			
					
					if( ! this.#note.stock || ! this.#note.budgetValue ){
						console.error("This is not a valid Stock Note....SellStock transaction now aborting");
						return false;
					}
					
					let stockValue 	= this.#note.budgetValue * this.#note.stock;
					let stock 		= budget.value / stockValue;
					
					totalValue 		= budget.value * stock;
					Pay 			= totalValue * this.#note.noteValue;						
					
					
					let exValue;
					
					//we have to configure the pay to obey the exchange values of the credits 
					//involve in the transaction if the seller want'this.s to sell to a particular note type
					if( this.details.noteType != budget.budgetCredit ){
						exValue 	= await this.getExchangeValue( this.details.noteType, budget.budgetCredit );
						Pay 	= Pay * exValue[1];
						totalValue = totalValue * exValue[1];
					}
					
					//if the pay value gotten is lesser than the transaction value.
					if( Pay < this.details.transValue ){
						this.details.transValue 	= Pay;
					}

										
					budget.pay 			= this.details.transValue / Pay;
					budget.stock 		= this.details.transValue / totalValue;
					
					this.details.pay 	= budget.pay;
					
					//sending the funds to the recipient note.
					//configuring it to favour the recipient and the sender of the transaction
					if( this.response )
						await this.setPublicKey( this.details.recipient );
					
					else 
						await this.setPublicKey( this.budgetID );
					
					//first we save the block IDs in the newBlock
					let blockID				= this.newBlock.blockID;
					let nextBlockID 		= this.newBlock.nextBlockID;
					let formerBlockID 		= this.newBlock.formerBlockID;
					let walletHash			= this.newBlock.walletHASH;
					let nextWalletHASH 		= this.newBlock.nextWalletHASH;
					let formerWalletHASH 	= this.newBlock.formerWalletHASH;
					
					this.newBlock 				= this.details;
					//creating the block refs signatures.
					budget.privateKey 			= await this.generateKey(20);
					await this.setPrivateKey( budget.privateKey );
					this.newBlock.blockRef 		= await this.getPublicKey();
					this.newBlock.signRef 		= await this.generateKey(15);
					
					//encrypting the agreement.
					await this.setPublicKey( this.details.recipient );
					this.newBlock.recipient		= await this.#encrypt( JSON.stringify( budget ) );

					//adding the blockIDs
					this.newBlock.blockID 			= blockID;
					this.newBlock.nextBlockID		= nextBlockID;
					this.newBlock.formerBlockID 	= formerBlockID;
					this.newBlock.walletHASH		= walletHash;
					this.newBlock.formerWalletHASH	= formerWalletHASH;
					this.newBlock.nextWalletHASH	= nextWalletHASH;
					
					//update the note value.
					this.#note.noteValue 		-= this.details.pay;
				}
				else if( this.details.transType == 'STOCKPAY' ) {
					if( ! this.budgetBlock && this.#note.budgetID ) {
						this.budgetID 		= this.#note.budgetID;
						this.budgetBlock 	= await this.getTransBlock();
					}
					
					if( ! this.budgetBlock ){
						console.error("Sorry we can't process a stock pay transaction without a valid budget block. Please try again by checking the budget ID.");
						return false;
					}
					
					if( this.budgetBlock && this.budgetBlock.length ){
						this.budgetBlock 	= await this.getCurrentBlock( this.budgetBlock );
					}				
						
					let investorsHub 	= this.budgetBlock.agreement.investorsHub;
					this.string 		= this.details.reference;
					let hashKey			= await this.hashed();
						
					if( ! investorsHub.indexOf( hashKey ) ) {
						console.error("Sorry, We couldn't find your stock note as a valid investor on this budget. Please try again with a different stock note.");
						return false;
					}
					
					if( ! this.details.agreement )
						this.details.agreement 	= this.budgetBlock.agreement;
					
					this.details.agreement.privateKey = await this.generateKey( 30 );
					
					if( ! this.details.recipient || this.details.recipient != this.#note.motherKey )
						this.details.recipient 	= this.#note.motherKey;
					
					await this.setPublicKey( this.details.recipient );
					this.newBlock.recipient 	= await this.#encrypt( JSON.stringify( this.details.agreement ) );
					
					await this.setPrivateKey( this.details.agreement.privateKey );
					
					this.newBlock.transType 	= "SEND";
					this.newBlock.budgetID 		= this.details.budgetID;
					this.newBlock.pay			= this.details.pay;
					this.newBlock.blockRef		= await this.getPublicKey();
					this.newBlock.signRef		= await this.generateKey(20);
				}
		}
		//for transactions that can only be handled by bond note types. Note bonds are created by the exchange market of a 
		//Scriptbill credit.
		else if( await this.testNoteType("BND") ){
			if( this.details.transType == "SOLDBOND" || this.response.transType == "BUYBOND" ) {
					if( this.response && this.response.transType == this.details.transType ) {
						
						if( this.response.transType == "BUYBOND" )
							this.details.transType = "SOLDBOND";
						
					}
					
					//most of the time the blockKey is what is used to make the transaction not the noteAddress because
					//it is a public exchange transaction.
					await this.setPrivateKey( this.#note.blockKey );
					agreement = await this.#decrypt( this.response.agreement );
					
					if( ! await this.isJsonable( agreement ) ) return false;
					
					this.budgetID 		= this.#note.budgetID;
					this.transType 		= "CREATEBUDGET";
					this.budgetBlock 	= await this.getTransBlock()[0];
					
					if( ! this.budgetBlock ){
						console.error("Can't sell Scriptbill Bond without a valid Scriptbill Budget.");
						return false;
					}
					
					if( ! this.budgetBlock.agreement || this.budgetBlock.agreement.budgetType != "governmental" ) {
						console.error("Can't Buy Bond without a Valid Governmental Budget data");
						return false;
					}
					
					//next create a transaction block that will target the mother note
					//the transaction type will INVEST transType. the note will recieve the investment funds
					//and create a SOLDSTOCK transaction to the initiator'this.s note, which will create a QUOTESTOCK
					//transaction to either create the stock note or update an existing stock note.
					//first we save the block IDs in the newBlock
					let blockID				= this.newBlock.blockID;
					let nextBlockID 		= this.newBlock.nextBlockID;
					let formerBlockID 		= this.newBlock.formerBlockID;
					let walletHash			= this.newBlock.walletHASH;
					let nextWalletHASH 		= this.newBlock.nextWalletHASH;
					let formerWalletHASH 	= this.newBlock.formerWalletHASH;
					//this will help preserve the blockRefs and other important info on the block which will be 
					//used by the mother note to prepare the SOLDSTOCK transaction.
					this.newBlock			= this.response;
					//set the mother note Key as public key to encrypt the agreement;
					await this.setPublicKey( this.#note.motherKey );
					//not parsed yet
					this.newBlock.recipient	= await this.#encrypt( agreement );
					//adding the blockIDs
					this.newBlock.blockID 			= blockID;
					this.newBlock.nextBlockID		= nextBlockID;
					this.newBlock.formerBlockID 	= formerBlockID;
					this.newBlock.walletHASH		= walletHash;
					this.newBlock.formerWalletHASH	= formerWalletHASH;
					this.newBlock.nextWalletHASH	= nextWalletHASH;
					
					//ensure the transType is an INVEST transType so that the program can interprete the details 
					//as INVESTRECIEVE treansType. this transType occurs when a stock or bond note is redirecting a 
					//transaction to her mother note.
					this.newBlock.transType 		= "INVEST";
					
				}
		}
		
		if( this.newBlock.transType == "CREATE" && this.newBlock.noteType != "SBCRD" && await this.testNoteType("CRD") ){
			
			//before configuring the noteType, we have to query to see if the new credit type exist in the 
			//scriptbill database systems
			this.noteTypeS 		= this.newBlock.noteType;
			let noteBlock 		= await this.getTransBlock();
			
			if( noteBlock.length == 0 ){
			
				//make sure the default details have been configured by the creators of the credit.
				let exchangeNote 		= this.newBlock.exchangeNote;
				exchangeNote.noteType 	= this.newBlock.noteType;
				privKey 				= await this.generateKey(50);
				await this.setPrivateKey( privKey );
				exchangeNote.exchangeID 	= await this.getPublicKey();
				exchangeNote.exchangeKey 	= privKey;
				let budget 	 			= this.budgetConfig;
				budget.budgetType 		= "governmental";
				privKey 				= await this.generateKey( 40 );
				await this.setPrivateKey( privKey );
				budget.budgetID 		= await this.getPublicKey();
				exchangeNote.budgetID 	= privKey;
				budget.value 			= 1;
				
				let noteType;
				
				//if the exchange note of the mother credit was set as current note
				//we check the validity.
				if( this.#currentNote && this.#currentNote.budgetID ){
					await this.setPrivateKey( this.#currentNote.budgetID );
					this.budgetID 		= await this.getPublicKey();
					let budgetBlock 	= await this.getTransBlock()[0];//anyone that returns will be valid enough
					
					if( budgetBlock && budgetBlock.agreement && budgetBlock.agreement.budgetType && budgetBlock.agreement.budgetType == "governmental" ){
						noteType 		= this.#currentNote.noteType;
					}
					else {
						noteType 		= exchangeNote.noteType;
					}
				}
				else {
					noteType 		= exchangeNote.noteType;
				}
				
				budget.budgetCredit 		= noteType;
				this.newBlock.agreement 	= budget;
				this.newBlock.exchangeNote 	= exchangeNote;
				
				//calculating the exchange note IDs
				let secret 					= this.#note.noteSecret;
				this.#note.noteSecret 		= exchangeNote.exchangeKey;
				//incase the seed has been populated, we repopulate it.
				this.seed 					= await this.currentTime();
				this.newBlock.exBlockID		= await this.calculateNextBlockID();
				this.seed 					= this.newBlock.exBlockID;
				this.newBlock.exNextBlockID	= await this.calculateNextBlockID();
				this.newBlock.exFormerBlockID = "";
				this.#note.noteSecret 		= secret;
			} 			
		} else {
			//calculating the exchange block IDs
			this.exchangeBlock 				= JSON.parse( JSON.stringify( this.block ) );
			console.log("this.exchangeBlock: " + JSON.stringify( this.exchangeBlock ));
			let exBlock 					= await this.getCurrentExchangeBlock();
			console.log( "returned exBlock: " + exBlock, " this type: " + typeof exBlock );
			let secret 						= this.#note.noteSecret;
			this.#note.noteSecret 			= exBlock.exchangeNote.exchangeKey;
			this.newBlock.exBlockID 		= exBlock.exNextBlockID;
			this.newBlock.exFormerBlockID	= exBlock.exBlockID;
			this.seed 						= this.newBlock.exBlockID;
			this.newBlock.exNextBlockID		= await this.calculateNextBlockID();
			this.#note.noteSecret			= secret;			
		}
		
		
		
		//updating the transType on the note.
		this.#note.transType 				= this.newBlock.transType;
		
		
		//add the current block ID to the note.
		this.#note.blockID 				= this.newBlock.blockID;
		
		//cdn: https://cdnjs.cloudflare.com/ajax/libs/jsencrypt/3.2.1/jsencrypt.min.js
		//next we configure the transaction block to make it useful for the network. Since everything is perfect on the network
		this.newBlock.transTime 		= await this.currentTime();
		this.#note.transTime 			= this.newBlock.transTime;
		
		//generate new Block key
		this.#note.blockKey				= await this.generateKey(30);
		await this.setPrivateKey( this.#note.blockKey );
		this.newBlock.blockKey 			= await this.getPublicKey();
		
		//let'this.s sign the transaction block.
		 this.signTxt					= this.newBlock.blockID;
		this.signKey					= this.#note.blockKey;
		this.newBlock.blockSign			= await this.Sign();		
		
		//give it a wallet signature.
		this.signText					= this.newBlock.walletHASH;
		this.signKey					= this.#note.blockKey;
		this.newBlock.walletSign		= await this.Sign();
		
		//adding the expiry time to the block
		this.newBlock.expiry			= parseInt(await this.currentTime()) + parseInt(this.calculateTime("2 weeks"));
		
		//parsing the argument so that other details from the details handler will be 
		//added to the newBlock forming a possibility of adding extra data to 
		//transaction blocks
		//this.newBlock 		= this.parseArgs( this.newBlock, this.details );

		alert( this.newBlock.blockID );
		
		//charging the gas fee.
		this.newBlock =  await this.chargeGasFee();
		
		//calculate the transaction hashes of the block, before calculating the total hash of both the note and the block.
		this.string 				= JSON.stringify( this.newBlock );
		let transHash 				= await this.hashed();
		this.newBlock.transHash   	= transHash.slice( 0, transHash.length / 2 );		
		
		//since the transaction hash is gotten, we save the transaction hash from being manipulated by hashing the total hash of the block in the note.
		this.string 					= transHash;
		this.#note.blockHash			= await this.hashed();
		
		//signing the note.
		 this.signTxt 					= this.#note.blockHash;
		this.signKey					= this.#note.noteSecret;
		this.#note.noteSign				= await this.Sign();
		this.newBlock.noteSign			= this.#note.noteSign;
		
		//hashing the note before saving the transaction block
		this.string 				= JSON.stringify( this.#note );
		let noteHash				= await this.hashed();
		this.newBlock.noteHash		= noteHash.slice( 0, noteHash.length / 2 );
		this.#note.noteHash			= noteHash.slice( noteHash.length / 2, noteHash.length );
		this.#note.transHash 		= transHash.slice( transHash.length / 2, transHash.length );
		
		//creating the total hash variable.
		if( ! this.newBlock.totalHASH )
			this.newBlock.totalHASH = "";
		
		this.newBlock.lastTotalHASH	= this.newBlock.totalHASH;
		this.string 				= JSON.stringify( this.newBlock ) + this.newBlock.totalHASH;
		let totalHash 				= await this.hashed();
		this.newBlock.totalHASH		= totalHash;
		
		//creating the real hash variable.
		if( ! this.newBlock.realHash )
			this.newBlock.realHash = "";
		
		//this is the total hash of the note stored in the real hash variable.
		this.newBlock.lastRealHash 	= this.newBlock.realHash;
		this.string					= JSON.stringify( this.#note ) + this.newBlock.realHash;
		this.newBlock.realHash		= await this.hashed();
		
		console.log( "Create Product ID " + this.newBlock.productID );
		
		console.log('Current Note: ' + JSON.stringify(this.#note));
		
		transKey 		= this.#note.transKey;
		
		if( this.#passwordKey && ! this.#isExchangeMarketMining ){
			for( d = 0; d < this.#passwordKey.length; d++ ){
				key 		= this.#passwordKey[ d ];
				trans1		= transKey.slice( 0, key );
				trans2 		= transKey.slice( key, transKey.length );
				transKey 	= trans2 + trans1;
			}
		}
		
		await this.setPrivateKey( transKey );
		this.#note.noteSecret 		= await this.#encrypt( this.#note.noteSecret );
		
		//saving the current note.
		if( this.#saveNote )
			await this.saveNote();
		
		console.log('Current Block: ' + JSON.stringify( this.newBlock ) );
		//save the current block
		
		
		if( this.titheValue && this.response.productID && ( this.response.transType == 'BUYPRODUCT' || this.response.transType == 'PRODUCTSUB' ) ){
			let titheValue 	= this.titheValue;
			this.titheValue = false;
			this.response = this.newBlock;
			await this.storeBlock();
			let getData = await this.getData("blockData", JSON.stringify( this.newBlock ));
			console.log( "data gotten: " + getData, " Stringified: " + JSON.stringify( getData ) );
			this.buyScriptbillBonds( titheValue );
		}
		
		else if( ( this.response.productID && this.shareValue &&  this.transRecieve.includes( this.newBlock.transType ) &&  this.response.transType == 'PROFITSHARING' ) || ( ! this.titheValue && this.newBlock.transType == "BUYBOND" && ( this.response.transType == "BUYPRODUCT" || this.response.transType == "PRODUCTSUB" ) ) ){
			this.details.transValue = this.shareValue;
			this.details.transType 	= 'PROFITSHARING';
			this.productBlockID 	= this.details.nextRecipient ? this.details.nextRecipient : this.response.productFormerBlockID;
			let block 				= await this.getTransBlock()//PERERE
			
			if( ! block || block.blockID == this.#note.blockID || block.blockID == '' ) return;
			
			this.details.recipient = block.blockKey;
			this.details.agreement = agreement;
			
			//storing block
			this.response = this.newBlock;
			await this.storeBlock();
			let getData = await this.getData("blockData", JSON.stringify( this.newBlock ));
			console.log( "data gotten: " + getData, " Stringified: " + JSON.stringify( getData ) );
			
			return await this.generateScriptbillTransactionBlock();			
		}
		let note = this.#note;
		//for transaction that would be quickly processed.
		if( this.#currentNote && this.#currentNote.noteAddress == this.details.recipient && this.transSend.includes( this.newBlock.transType ) ){
			this.response = this.newBlock;
			this.details  = JSON.parse( JSON.stringify( this.newBlock ) );
			
			if( this.response.transType != "PROFITSHARING" || this.response.transType != "INVEST"){
				this.details.transType = "RECIEVE";
			}
			else if( this.response.transType == "PROFITSHARING" ){
				this.details.transType 	= "PROFITRECIEVE";
			}
			else if( this.response.transType == "INVEST" ){
				this.details.transType = "INVESTRECIEVE";
			}
			
			await this.storeBlock();
			let getData = await this.getData("blockData", JSON.stringify( this.newBlock ));
			console.log( "data gotten: " + getData, " Stringified: " + JSON.stringify( getData ) );
			
			return await this.generateScriptbillTransactionBlock();
		}
		this.note = await this.#getCurrentNote();
		//ensuring the current note is not the note running for the current user.
		
		if( this.note.noteAddress != note.noteAddress ) {
			this.#note = note;
			delete this.note;
			await this.setCurrentNote();
		}
		this.response = this.newBlock;
		await this.storeBlock();
		let getData = await this.getData("blockData", JSON.stringify( this.newBlock ));
		console.log( "data gotten: " + getData, " Stringified: " + JSON.stringify( getData ) );
		return this.newBlock;
			
	}
	
	static async getCurrentExchangeBlock(){
		console.log("getCurrentExchangeBlock running " + this.funcUp);
		this.funcUp = "getCurrentExchangeBlock";
		
		if( ! this.exchangeBlock && ! this.exchangeBlocks ) return;
		
		if( this.exchangeBlocks && this.exchangeBlocks.length && typeof this.exchangeBlocks == "object" ){
			let x, lastBlock = null;
			for( x = 0; x < this.exchangeBlocks.length; x++ ){
				this.exchangeBlock = this.exchangeBlocks[x];
				if( lastBlock && lastBlock.transTime > this.exchangeBlock.transTime ){
					this.exchangeBlock 	= JSON.parse( JSON.stringify( lastBlock ) );
					lastBlock			= JSON.parse( JSON.stringify( this.exchangeBlock ) );
				}
				lastBlock 		= JSON.parse( JSON.stringify( this.exchangeBlock ) );
			}
		}
		
		if( ! await this.l["HASHTABLE"] ) return this.exchangeBlock;
		
		let hashTable = JSON.parse( await this.l["HASHTABLE"] );
		
		if( ! hashTable || ! this.noRequest ) return this.exchangeBlock;
		
		let nextHash;
		//look for block with the wallet Hash.
		
		if( hashTable[ this.exchangeBlock.exNextBlockID ] ){
			nextHash 	= hashTable[ this.exchangeBlock.exNextBlockID ];
		}
		
		if( ! nextHash ) return this.exchangeBlock;
		
		nextHash 		= nextHash[0];
		let x, lastHash, formerHash;
		
		let lastBlock 		= JSON.parse( JSON.stringify( this.exchangeBlock ));
		
		for( x = 0; x < Infinity; x++ ){
			lastHash 	= nextHash;
			nextHash    = hashTable[ lastHash ];
			
			if( nextHash ) {
				nextHash 	= nextHash[0];
				formerHash 	= nextHash[1];
			}
			else {
				//time to get the transBlocks
				this.exBlockID 			= lastHash;
				this.exchangeBlock		= await this.getTransBlock();
				
				if( this.exchangeBlock ) break;
				
				else {
					if( formerHash ){
						this.exBlock 		= formerHash;
						this.exchangeBlock		= await this.getTransBlock();
						
						if( ! this.exchangeBlock ){
							this.exchangeBlock = lastBlock;
						}
					}
					
					break;
				}
				
			}
		}
		
		return this.exchangeBlock;	
	}
	
	static async recieveAutoExecute(){
		console.log("recieveAutoExecute running " + this.funcUp);
		this.funcUp = "recieveAutoExecute";
		if( ! this.response || this.response.nextBlockID != "AUTOEXECUTE"  )
			return;
		
		this.#note = this.getCurrentNote();
			
		if( ! this.#note && ! this.#note.noteAddress ) return;
		
		let agreement = this.response.blockRef;
		//test the agreement with the blockKey
		await this.setPrivateKey( this.#note.blockKey );
		agreement 		= await this.#decrypt( agreement );
		
		if( ! await this.isJsonable( agreement ) ){
			//test using the agreement ID. the response blok must be a PRODUCTSUB block for it to work.
			if( this.response.transType != "PRODUCTSUB" ) return;
			
			let x, privKey, found = false;
			for( x = 0; x < this.#note.agreements.length; x++ ){
				privKey = this.#note.agreements[x];
				await this.setPrivateKey( privKey );
				agreement = await this.#decrypt( this.response.blockRef );
				if( ! await this.isJsonable( agreement ) ) continue;
				
				found = true;
			}
			
			if( ! found )
				return;
		}
		
		//agreement decrypted.
		this.details = this.response;
		this.details.transType = "RECIEVE";
		this.details.trnasValue = 0 - this.response.transValue;
		this.details.agreement 	= agreement;
		
		//configure the note as well
		this.#note.blockID 		= this.response.blockID;
		return await this.generateScriptbillTransactionBlock();
		
	}
	
	static async chargeGasFee(){
		console.log("chargeGasFee running " + this.funcUp);
		this.funcUp = "chargeGasFee";
		if( ! this.newBlock || this.newBlock.noteType == "SBCRD" || this.newBlock.noteType == "SBSTK" || this.newBlock.noteType == "SBBND") return this.newBlock;
		
		let bytes = JSON.stringify( this.newBlock ).length;
		
		if( ! this.newBlock.GAS )
			this.newBlock.GAS = 0;
		
		let GAS 	= this.newBlock.GAS * 10000000;
		let remainingGas = GAS - bytes;
		this.newBlock.GAS = remainingGas / 10000000;
		
		return this.newBlock;
	}
	
	static async getCurrentBlock( blocks ){
		console.log("getCurrentBlock running " + this.funcUp);
		this.funcUp = "getCurrentBlock";
		
		let realBlock, y, block;
		
		if( typeof blocks == "object" && blocks.length ){
			for( y = 0; y < blocks.length; y++ ){
				block = blocks[y];
				
				if( realBlock && realBlock.transTime < block.transTime ){
					realBlock 		= block;
				} else if( ! realBlock ){
					realBlock 		= block;
				}				
			}
		}
		else {
			
			if( blocks.length == 0 )
				realBlock = false;
			
			else
				realBlock = blocks;
		}
		
		if( ! await this.l["HASHTABLE"] || this.noRequest ) return realBlock;
		
		let hashTable = JSON.parse( await this.l["HASHTABLE"] );
		
		if( ! hashTable ) return realBlock;
		
		let nextHash;
		//look for block with the wallet Hash.
		
		if( hashTable[ realBlock.nextBlockID ] ){
			nextHash 	= hashTable[ realBlock.nextBlockID ];
		}
		
		if( ! nextHash ) return realBlock;
		
		nextHash 		= nextHash[0];
		let x, lastHash, formerHash;
		
		let lastBlock 		= JSON.parse( JSON.stringify( realBlock ));
		
		for( x = 0; x < Infinity; x++ ){
			lastHash 	= nextHash;
			nextHash    = hashTable[ lastHash ];
			
			if( nextHash ) {
				nextHash 	= nextHash[0];
				formerHash 	= nextHash[1];
			}
			else {
				//time to get the transBlocks
				this.blockID 	= lastHash;
				realBlock		= await this.getTransBlock();
				
				if( realBlock ) break;
				
				else {
					if( formerHash ){
						this.blockID 		= formerHash;
						realBlock		= await this.getTransBlock();
						
						if( ! realBlock ){
							realBlock = lastBlock;
						}
					}
					
					break;
				}
				
			}
		}
		
		return realBlock;	
		
	}
	
	static async calculateInterestRate( interestType, interestRate ){
		console.log("calculateInterestRate running " + this.funcUp);
		this.funcUp = "calculateInterestRate";
		switch( interestType ){
			case "PT":
				return interestRate;
			break;
			case "DL":
				return interestRate;
			break;
			case "HL":
				return interestRate / 24;
			break;
			case "E1H":
				return interestRate / 24;
			break;
			case "E2H":
				return interestRate / 12;
			break;
			case "E3H":
				return interestRate / 8;
			break;
			case "E4H":
				return interestRate / 6;
			break;
			case "E5H":
				return interestRate / 4.8;
			break;
			case "E6H":
				return interestRate / 4;
			break;
			case "E7H":
				return interestRate / 3.43;
			break;
			case "E8H":
				return interestRate / 3;
			break;
			case "E9H":
				return interestRate / 2.67;
			break;
			case "E10H":
				return interestRate / 2.4;
			break;
			case "E11H":
				return interestRate / 2.2;
			break;
			case "E12H":
				return interestRate / 2;
			break;
			case "E13H":
				return interestRate / 1.85;
			break;
			case "E14H":
				return interestRate / 1.71;
			break;
			case "E15H":
				return interestRate / 1.6;
			break;
			case "E16H":
				return interestRate / 1.5;
			break;
			case "E17H":
				return interestRate / 1.41;
			break;
			case "E18H":
				return interestRate / 1.33;
			break;
			case "E19H":
				return interestRate / 1.26;
			break;
			case "E20H":
				return interestRate / 1.2;
			break;
			case "E21H":
				return interestRate / 1.14;
			break;
			case "E22H":
				return interestRate / 1.09;
			break;
			case "E23H":
				return interestRate / 1.04;
			break;
			case "E24H":
				return interestRate;
			break;
			case "E1D":
				return interestRate;
			break;
			case "E2D":
				return interestRate * 2;
			break;
			case "E3D":
				return interestRate * 3;
			break;
			case "E4D":
				return interestRate * 4;
			break;
			case "E5D":
				return interestRate * 5;
			break;
			case "E6D":
				return interestRate * 6;
			break;
			case "E7D":
				return interestRate * 7;
			break;
			case "E8D":
				return interestRate * 8;
			break;
			case "E9D":
				return interestRate * 9;
			break;
			case "E10D":
				return interestRate * 10;
			break;
			case "E11D":
				return interestRate * 11;
			break;
			case "E12D":
				return interestRate * 12;
			break;
			case "E13D":
				return interestRate * 13;
			break;
			case "E14D":
				return interestRate * 14;
			break;
			case "E15D":
				return interestRate * 15;
			break;
			case "E16D":
				return interestRate * 16;
			break;
			case "E17D":
				return interestRate * 17;
			break;
			case "E18D":
				return interestRate * 18;
			break;
			case "E19D":
				return interestRate * 19;
			break;
			case "E20D":
				return interestRate * 20;
			break;
			case "E21D":
				return interestRate * 21;
			break;
			case "E22D":
				return interestRate * 22;
			break;
			case "E23D":
				return interestRate * 23;
			break;
			case "E24D":
				return interestRate * 24;
			break;
			case "E25D":
				return interestRate * 25;
			break;
			case "E26D":
				return interestRate * 26;
			break;
			case "E27D":
				return interestRate * 27;
			break;
			case "E28D":
				return interestRate * 28;
			break;
			case "E29D":
				return interestRate * 29;
			break;
			case "E30D":
				return interestRate * 30;
			break;
			case "ML":
				return interestRate * 30;
			break;
			case "E2M":
				return interestRate * 60;
			break;
			case "E3M":
				return interestRate * 90;
			break;
			case "E4M":
				return interestRate * 120;
			break;
			case "E5M":
				return interestRate * 150;
			break;
			case "E6M":
				return interestRate * 180;
			break;
			case "E7M":
				return interestRate * 210;
			break;
			case "E8M":
				return interestRate * 240;
			break;
			case "E9M":
				return interestRate * 270;
			break;
			case "E10M":
				return interestRate * 300;
			break;
			case "E11M":
				return interestRate * 330;
			break;
			case "E12M":
				return interestRate * 360;
			break;
			case "YL":
				return interestRate * 360;
			break;
			case "E2Y":
				return this.calculateInterestRate( "YL", interestRate ) * 2;
			break;
			case "E3Y":
				return this.calculateInterestRate( "YL", interestRate ) * 3;
			break;
			case "E4Y":
				return this.calculateInterestRate( "YL", interestRate ) * 4;
			break;
			case "E5Y":
				return this.calculateInterestRate( "YL", interestRate ) * 5;
			break;
			case "E6Y":
				return this.calculateInterestRate( "YL", interestRate ) * 6;
			break;
			case "E7Y":
				return this.calculateInterestRate( "YL", interestRate ) * 7;
			break;
			case "E8Y":
				return this.calculateInterestRate( "YL", interestRate ) * 8;
			break;
			case "E9Y":
				return this.calculateInterestRate( "YL", interestRate ) * 9;
			break;
			case "E10Y":
				return this.calculateInterestRate( "YL", interestRate ) * 10;
			break;
			default:
				return interestRate;
			break;
		}			
	}
	
	static async calculateInterestType( rank = false ){
		console.log("calculateInterestType running " + this.funcUp);
		this.funcUp = "calculateInterestType";
		if( ! rank ) {
			rank = this.#scriptbillRanks[Object.keys( this.#scriptbillRanks )[0]];
		}
		
		let level = rank.level;
		
		switch(level){
			case 1:
				return "PT";
			break;
			case 2:
				return "PT";
			break;
			case 3:
				return "PT";
			break;
			case 4:
				return "E3H";
			break;
			case 5:
				return "E6H";
			break;
			case 6:
				return "E12H";
			break;
			case 7:
				return "E18H";
			break;
			case 8:
				return "E21H";
			break;
			case 9:
				return "DL";
			break;
			case 10:
				return "E1D";
			break;
			case 11:
				return "E2D";
			break;
			case 12:
				return "E3D";
			break;
			case 13:
				return "E4D";
			break;
			case 14:
				return "E5D";
			break;
			case 15:
				return "E6D";
			break;
			case 16:
				return "WL";
			break;
			case 17:
				return "E8D";
			break;
			case 18:
				return "E10D";
			break;
			case 19:
				return "E12D";
			break;
			case 20:
				return "E2W";
			break;
			case 21:
				return "E16D";
			break;
			case 22:
				return "E18D";
			break;
			case 23:
				return "E20D";
			break;
			case 24:
				return "E3W";
			break;
			case 25:
				return "E24D";
			break;
			case 26:
				return "E27D";
			break;
			case 27:
				return "ML";
			break;
			case 28:
				return "E40D";
			break;
			case 29:
				return "E5W";
			break;
			case 30:
				return "E6W";
			break;
			case 31:
				return "E7W";
			break;
			case 32:
				return "E8W";
			break;
			case 33:
				return "E2M";
			break;
			case 34:
				return "E10W";
			break;
			case 35:
				return "E12W";
			break;
			case 36:
				return "E3M";
			break;
			case 37:
				return "E16W";
			break;
			case 38:
				return "E4M";
			break;
			case 39:
				return "E18W";
			break;
			case 40:
				return "E19W";
			break;
			case 41:
				return "E20W";
			break;
			case 42:
				return "E5M";
			break;
			case 43:
				return "E21W";
			break;
			case 44:
				return "E22W";
			break;
			case 45:
				return "E23W";
			break;
			case 46:
				return "E24W";
			break;
			case 47:
				return "E6M";
			break;
			case 48:
				return "E25W";
			break;
			case 49:
				return "E26W";
			break;
			case 50:
				return "E9M";
			break;
			default:
				return "PT";
			break;
		}
	}
	
	
	static async getObjKey(obj, value) {
		console.log("getObjKey running " + this.funcUp);
		this.funcUp = "getObjKey";
	  return Object.keys(obj).find(key => obj[key] === value);
	}
	static async getObjKeys(obj, value) {
		console.log("getObjKeys running " + this.funcUp);
		this.funcUp = "getObjKeys";
	  return Object.keys(obj).filter(key => obj[key] === value);
	}
	
	static async parseArgs( array1, array2 ){
		console.log("parseArgs running " + this.funcUp);
		this.funcUp = "parseArgs";
		let arrKeys1 = Object.keys( array1 );
		let arrKeys2 = Object.keys( array2 );
		let x, val;
		
		//checking the keys in array1 that is not in 2
		for( x = 0; x < arrKeys1.length; x++ ){
			val = arrKeys1[x];
			
			if( arrKeys2.includes( val ) ){
				delete arrKeys2[ this.getObjKey( arrKeys2, val ) ];
			}
		}
		
		for( x = 0; x < arrKeys2.length; x++ ){
			val 	= arrKeys2[x];
			array1[ val ]	= array2[val];
		}
		
		return array1;
	}
	
	static async getCurrentWalletBlock( referenceBlock ){
		console.log("getCurrentWalletBlock running " + this.funcUp);
		this.funcUp = "getCurrentWalletBlock";
		//the current note must have a wallet ID and a reference block with the tight wallet hashes to get the wallet blocks
		if( ! this.walletID || ! referenceBlock.nextWalletHASH ) return referenceBlock;
		
		if( ! await this.l["HASHTABLE"] ) return referenceBlock;
		
		let hashTable = JSON.parse( await this.l["HASHTABLE"] );
		
		if( ! hashTable ) return referenceBlock;
		
		let nextHash;
		//look for block with the wallet Hash.
		
		if( hashTable[ referenceBlock.nextWalletHASH ] ){
			nextHash 	= hashTable[ referenceBlock.nextWalletHASH ];
		}
		
		if( ! nextHash ) return referenceBlock;
		
		nextHash 		= nextHash[0];
		let x, lastHash, formerHash;
		
		let lastBlock 		= JSON.parse( JSON.stringify( referenceBlock ));
		
		for( x = 0; x < Infinity; x++ ){
			lastHash 	= nextHash;
			nextHash    = hashTable[ lastHash ];
			
			if( nextHash ) {
				nextHash 	= nextHash[0];
				formerHash 	= nextHash[1];
			}
			else {
				//time to get the transBlocks
				this.walletHASH 	= lastHash;
				referenceBlock		= await this.getTransBlock();
				
				if( referenceBlock ) break;
				
				else {
					if( formerHash ){
						this.walletHASH 	= formerHash;
						referenceBlock		= await this.getTransBlock();
						
						if( ! referenceBlock ){
							referenceBlock = lastBlock;
						}
					}
					
					break;
				}
				
			}
		}
		
		return referenceBlock;		
	}
	
	static async traceBlockIDFromWalletID( walletID = "" ){
		console.log("traceBlockIDFromWalletID running " + this.funcUp);
		this.funcUp = "traceBlockIDFromWalletID";
		if( ! walletID && ( this.walletID || this.#note.walletID ) ){
			if( this.walletID ){
				walletID = this.walletID;
			}
			else if( this.#note && this.#note.walletID ){
				walletID 	= this.#note.walletID;
			}
		}
				
		this.getTransactions(function( block, key, t ){
			t.setPrivateKey( walletID );
			if( block.walletHASH && block.nextWalletHASH ){
				let testHASH =  t.#encrypt( block.walletHASH );
				
				if( testHASH == block.nextWalletHASH ){
					t.this.l.walletBlock = JSON.stringify( block );
					t.stop = true;
				}
			}
		});
		
		if( await this.l.walletBlock ) {
			let walletBlock = JSON.parse( await this.l.walletBlock );
			delete await this.l.walletBlock;
			return walletBlock;
		}
		else {
			return false;
		}
	}
	
	static async Sign(){
		console.log("Sign running " + this.funcUp);
		this.funcUp = "Sign";
		if( CryptoJS && CryptoJS.SHA256 ){
			try {
				if(  this.signTxt && this.signKey ){
					console.log("SignText: " +  this.signTxt, "Sign Key: " + this.signKey );
					await this.setPrivateKey( this.signKey );
					let pubKey = await this.getPublicKey();
					let sign =  this.signTxt + pubKey;
					return CryptoJS.SHA256( sign ).toString( CryptoJS.enc.Base64 );
				}
				else {
					return false;
				}
					
			} catch(ex) {
				return false;
			}
		}
		else {
			return false;
		}
	}

	static async Verify(){
		console.log("Verify running " + this.funcUp);
		this.funcUp = "Verify";
		if( CryptoJS && CryptoJS.SHA256 ) {
			try {
				if( this.VerifyText && this.VerifyKey && this.signature ){
					console.log("VerifyText: " + this.VerifyText, "Sign Key: " + this.VerifyKey, "signature: " + this.signature );
					let verify = this.VerifyText + this.VerifyKey;
					let verified = CryptoJS.SHA256( verify ).toString( CryptoJS.enc.Base64 );
					return verified == this.signature;
				}
				else {
					return false;
				}
			}
			catch (ex){
				return false;
			}
		}
		else {
			return false;
		}
	}
	//Scriptbill function can help us trace the blocks that belong to a particular note
	static async calculateNextBlockID( depth = 1 ){
		console.log("calculateNextBlockID running " + this.funcUp);
		this.funcUp = "calculateNextBlockID";
		if( ! this.runned )
			this.runned = 0;
		
		//the note secret is the key the note has used to calculate the note'this.s unique block ID.
		//the first seed of the note is the current time the note was created. From that time the seed will now be the 
		//current block ID
		if( ! this.run ) 
			this.run = 1;

		if( this.executeStrictly && this.note )
			this.#note = this.note;
		
		
		if( this.#note.noteSecret ){
			if( this.#note.blockID && ! this.seed ){
				this.seed = this.#note.blockID;
			}
			
			else if( ! this.seed ){
				this.seed = await this.currentTime().toString();
			}
			
			await this.setPrivateKey( this.#note.noteSecret );
			
			console.log( "FUNC: calculateNextBlockID: Params: noteSecret: " + this.#note.noteSecret + " seed: " + this.seed + " runned: " + ++this.runned );
			
			if( this.run == depth ) {
				this.run = 0;
				let value = await this.#encrypt( this.seed );
				this.seed = false;
				return CryptoJS.MD5( value.toString()).toString( CryptoJS.enc.Base64 );
			}
			else {
				this.seed = await this.#encrypt( this.seed );
				this.run--;
				await this.calculateNextBlockID( depth );				
			}
		} else {
			return this.seed;
		}
		
	}
	
	static async calculateFormerBlockID( depth = 1 ){
		console.log("calculateFormerBlockID running " + this.funcUp );
		this.funcUp = "calculateFormerBlockID";
		if( ! this.frunned )
			this.frunned = 0;
		
		//the note key is a private key to the note secret, while the note secret is a private key to the note address. 
		//the note address is what is generally known in the network.
		if( ! this.run )
			this.run = 1;		
		
		
		if( await this.s.currentNote )
			this.#note = await this.#getCurrentNote();
			
		
		if(  this.#note && this.#note.noteKey ){
			if( this.#note.blockID && ! this.seed ){
				this.seed = this.#note.blockID;
			}
			
			else if( ! this.seed ){
				this.seed = await this.currentTime().toString();
			}
			await this.setPrivateKey( this.#note.noteKey );
			
			console.log( "FUNC: calculateFormerBlockID: Params: noteKey: " + this.#note.noteKey + " seed: " + this.seed + " runned: " + ++this.frunned );
			
			if( this.run == depth ) {
				this.run = 0;
				let value = await this.#decrypt( this.seed );
				this.seed = false;
				return value;
			}
			else {
				this.seed = await this.#decrypt( this.seed );
				let seed = parseInt( this.seed );
				
				if( seed )
					return this.seed;
				
				this.run--;
				this.calculateFormerBlockID();				
			}
		} else {
			return this.seed;
		}
	}
	
	static async traceBlockIDFromAddress( address = undefined ){
		console.log("traceBlockIDFromAddress running " + this.funcUp );
		this.funcUp = "traceBlockIDFromAddress";
		
		//initializing storage.
		this.s 		= await this.initSessionStorage();
		this.l 		= await this.initStorage();
		
		if( await this.s.currentNote )
		this.#note  = await this.#getCurrentNote();			
		
		if( ! this.#note || typeof this.#note != 'object' )
			return false;
		
		//Scriptbill function is meant for external note address of which the current note want to transact with.
		//if the address is not set, then the function assumes you want to run the getTransBlock function
		if( address == undefined ) {
			return await this.getTransBlock();			
		}
		
		this.getTransactions(function(block, key, scriptbill ){
			console.log("the blocks: " + JSON.stringify( block ), "type: " + typeof block, " loop key: " + key );
			//to test if the current block belongs to the current address we encrypt the blockID 
			//to see if it would return the next Block ID.
			//we'll test if the runner wants to search using wallet ID
			if( block && block.blockID ){
				if( ! scriptbill.isWalletSearch ) {
					let blockID = block.blockID;
					scriptbill.setPublicKey( address );
					let nextID = scriptbill.#encrypt( blockID );
					
					if( nextID == block.nextBlockID ) {
						scriptbill.stop = true;
						scriptbill.this.s.currentBlock = JSON.stringify( block );
					}
				}
				else {
					let walletHash = block.walletHASH;
					scriptbill.setPrivateKey( address );
					let nextHASH 	= scriptbill.#encrypt( walletHash );
					
					if( nextHASH == block.nextWalletHASH ) {
						scriptbill.stop = true;
						scriptbill.this.s.currentBlock = JSON.stringify( block );
					}
				}
			}
			//we stop the loop after 10000 times
			if( key > 10000 ){
				scriptbill.stop = true;
				return false;
			}
		});
		
		let block = false;
		
		if( await this.s.currentBlock != undefined )
			block = JSON.parse( await this.s.currentBlock );
		
		return block;
		
	}
	
	static async compare(array1, array2, type = 'merge'){
		console.log("compare running " + this.funcUp );
		this.funcUp = "compare";
		if( typeof array1 != 'object' || typeof array2 != 'object' ) return [];
		let length;
		let array = [];
		if( array1.length >= array2.length )
			length = array1.length;
		else
			length = array2.length;
		
		if( type = 'merge' ){
			let x;
			for( x = 0; x < length; x++ ){
				if( typeof array1[x] == 'object' )
					array1[x] = JSON.stringify( array1[x] );
				
				if( typeof array2[x] == 'object' )
					array2[x] = JSON.stringify( array2[x] );
				
				if( array1[x] == array2[x] && ! array.includes( array1[x] ) ){
					array.push( await this.isJsonable( array1[x] ) ? JSON.parse( array1[x] ) : array1[x] );
				}
				else  {
					if( array.includes( array1[x] ) && ! array.includes( array2[x] ) ){
						array.push( await this.isJsonable( array2[x] ) ? JSON.parse( array2[x] ) : array2[x] );
					}
					if( ! array.includes( array1[x] ) && array.includes( array2[x] ) ) {
						array.push( array1[x] );
					}
				}
			}
		} else if( type == 'budgetID' ) {
			let x, IDs = [], times = {};
			for( x = 0; x < length; x++ ){
				if( ! array1[x].budgetID && array2[x].budgetID && ! IDs.includes( array2[x].budgetID ) ) {
					IDs.push( array2[x].budgetID );
					times[ array2[x].budgetID ] = array2[x].transTime;
					array.push( array2[x] );
				}
				else if( array1[x].budgetID && ! array2[x].budgetID && ! IDs.includes( array1[x].budgetID ) ) {
					IDs.push( array2[x].budgetID );
					times[ array2[x].budgetID ] = array2[x].transTime;
					array.push( array2[x] );
				}
				else if( array1[x].budgetID && array2[x].budgetID && array1[x].budgetID == array2[x].budgetID && ! IDs.includes( array1[x].budgetID ) ){
					if( array1[x].transTime >= array2[x].transTime ){
						IDs.push( array1[x].budgetID );
						times[ array1[x].budgetID ] = array1[x].transTime;
						array.push( array1[x] );
					} else {
						IDs.push( array2[x].budgetID );
						times[ array2[x].budgetID ] = array2[x].transTime;
						array.push( array2[x] );
					}
				}
				else if(  array1[x].budgetID && array2[x].budgetID && array1[x].budgetID != array2[x].budgetID ) {
					if( ! IDs.includes( array1[x].budgetID ) ) {
						IDs.push( array1[x].budgetID );
						times[ array1[x].budgetID ] = array1[x].transTime;
						array.push( array1[x] );
					}
					else if( times[ array1[x].budgetID ] < array1[x].transTime ){
						IDs.push( array1[x].budgetID );
						times[ array1[x].budgetID ] = array1[x].transTime;
						array.push( array1[x] );
					}
					if( ! IDs.includes( array2[x].budgetID ) ){
						IDs.push( array2[x].budgetID );
						times[ array2[x].budgetID ] = array2[x].transTime;
						array.push( array2[x] );
					} else if( times[ array2[x].budgetID ] < array2[x].transTime ) {
						IDs.push( array2[x].budgetID );
						times[ array2[x].budgetID ] = array2[x].transTime;
						array.push( array2[x] );
					}
				}
				
				if( ID.includes( array1[x].budgetID ) && times[ array1[x].budgetID ] < array1[x].transTime ) {
					IDs.push( array1[x].budgetID );
					times[ array1[x].budgetID ] = array1[x].transTime;
					array.push( array1[x] );
				}
				if( ID.includes( array2[x].budgetID ) && times[ array2[x].budgetID ] < array2[x].transTime ) {
					IDs.push( array2[x].budgetID );
					times[ array2[x].budgetID ] = array2[x].transTime;
					array.push( array2[x] );
				}
			}
		}
		return array;
	}
	
	static async getData( key, data, url = "" ){
		console.log("getData running " + this.funcUp );
		this.funcUp = "getData";
		
		//initializing storage.
		this.s 		= await this.initSessionStorage();
		this.l 		= await this.initStorage();
		
		if( await this.s.currentNote )
			this.#note 	= await this.#getCurrentNote();
		
		if( url == '' ){			
			
			if( ! this.#note ){
				url 	= this.#default_scriptbill_server;
			}
			else {
				url 	= this.#note.noteServer;
			}
		}
		
		this.url 	= new URL( url /*"http://localhost/wordpress"*/ );
		
		if( typeof key == "object" && key.length && typeof data == "object" && data.length && data.length == key.length ){
			let x;
			for( x = 0; x < key.length; x++ ){
				this.url.searchParams.set(key[x], data[x]);
			}
		} else if( typeof key == "string" && typeof data == "string" ){
			this.url.searchParams.set( key, data );
		}
		else {
			console.error("data can't be gotten, Key and Data Gotten was not Properly Configured. Please Set the data and key as an array with the same length or as a String!!!");
			return false;
		}
		this.result = false;
		try {
			await fetch( this.url ).then( response =>{
				return response.text();
			}).then( async result=>{
				if( await this.isJsonable( result ) ){
					this.result = JSON.parse( result );
				} else {			
					this.result = result;
				}
			});
		} catch(e){
			return this.result;
		}
				
		return this.result;
	}
	
		
	//Scriptbill function is recursive, ensures that the block is gotten, even though it'this.s not stored on the server.
	//Scriptbill way, the function allows the note to get data from the server that holds it.
	static async getTransBlock(){
		console.log("getTransBlock running " + this.funcUp );
		this.funcUp = "getTransBlock";
		console.log("Used variables: this.blockID " + this.blockID + " " + typeof this.blockID," this.productBlockID: " +  this.productBlockID  + " " + typeof this.productBlockID, " this.walletHASH: " +  this.walletHASH  + " " + typeof this.walletHASH, " this.transType: " +  this.transType  + " " + typeof this.transType, " this.noteTypeS: " +  this.noteTypeS  + " " + typeof this.noteTypeS," this.productID: " +  this.productID  + " " + typeof this.productID , " this.sellCredit: " +  this.sellCredit  + " " + typeof this.sellCredit , " this.buyCredit: " +  this.buyCredit  + " " + typeof this.buyCredit, " this.budgetID: " +  this.budgetID  + " " + typeof this.budgetID , " this.blockRef: " +  this.blockRef  + " " + typeof this.blockRef , " this.exBlockID: " +  this.exBlockID  + " " + typeof this.exBlockID );
		
		if( await this.l[undefined] )
			delete await this.l[undefined];
				
		if( ! this.#note && ! this.blockID && ! this.productBlockID && ! this.walletHASH && ! this.transType && ! this.noteTypeS && ! this.productID && ! this.sellCredit && ! this.buyCredit && ! this.budgetID && ! this.blockRef && ! this.exBlockID ) return false;
		
		let db, trns, str, check, index;
				
		if( this.blockRef ){
			let blockIDs = JSON.parse( await this.isJsonable( await this.l[ this.blockRef ] ) ? await this.l[ this.blockRef ] : '[]' );
			let x, block;
			
			let blockRef		= this.blockRef;
			
			//removing data 
			delete this.blockRef;
			
			for( x = 0; x < blockIDs.length; x++ ){
				this.blockID = blockIDs[x];
				block        = await this.getTransBlock();
				if( block ){
					blockIDs[x] = block;
				}
				else {
					blockIDs[x] = {};
				}
			}
			
			
			
			return blockIDs;
		}
		//if the block reference is combined with the transaction type.
		else if( this.blockRef && this.transType ){
			let transType 	= this.transType;
			let blockRef	= this.blockRef;
			let blockRefs 	= JSON.parse( await this.l[ this.blockRef ] );
			
			
			//removing data 
			delete this.transType;
			delete this.blockRef;
			
			let blecks 		= [];
			let x, block = false;
			for( x = 0; x < blocks.length; x++ ){
				block = JSON.parse( await this.l[ blocks[x] ] );
				if( block.transType && block.transType == transType ){
					blecks.push( block );
				}
			}
			
			return blecks;
		}
		//if the block reference is combined with the note type.
		else if( this.blockRef && this.noteTypeS ){
			let noteType 	= this.noteTypeS;
			let blockRef 	= this.blockRef;
			let blocks 		= JSON.parse( await this.l[ this.blockRef ] );
			
			//removing data 
			delete this.noteTypeS;
			delete this.blockRef;
			
			let blecks 		= [];
			let x, block = false;
			for( x = 0; x < blocks.length; x++ ){
				block = JSON.parse( await this.l[ blocks[x] ] );
				if( block && block.noteType && block.noteType == noteType ){
					blecks.push( block );
				}
			}
			
			
			return bleck;
		}
		else if( this.productBlockID ){
			let ID 		= this.productBlockID;
			this.blockID = await this.l[ this.productBlockID ];
			if( ! this.blockID ){
				let data = await this.getData('productBlockID', this.productBlockID);
				
				//removing data.
				delete this.productBlockID;
								
						
				if( typeof data == 'object' ) {
					if( data.blockID ) {
						return data;
					} else if( data.error ){
						console.error( data.error );
						return false;
					}
				}
				else {
					return false;
				}
			} else {
				
				let block = JSON.parse( await this.l[ this.blockID ] );
				
				//removing data.
				delete this.blockID;
				delete this.productBlockID;
			}		
						
		}
		else if( this.walletHASH ){
			let hash = this.walletHASH;
			this.blockID = await this.l[ this.walletHASH ];
			if( ! this.blockID ){
				let data = await this.getData('walletHASH', this.walletHASH);
				
				//removing data
				delete this.walletHASH;
								
				if( typeof data == 'object' ) {
					if( data.blockID ) {
						return data;
					} else if( data.error ){
						console.error( data.error );
						return false;
					}
				}
				else {
					return false;
				}
			} else {
				let block = JSON.parse( await this.l[ this.blockID ] );
				
				delete this.blockID;
				delete this.walletHASH;
				
								
				return block;
			}		
		}
		else if( this.budgetID ){
			let budgetID 	= this.budgetID;
			let blockIDs = await this.l[ this.budgetID ];
			if( ! blockIDs ){
				let data = await this.getData('budgetID', this.budgetID);
				
				//removing data.
				delete this.budgetID;
								
				if( typeof data == 'object' ) {
					if( data.length && data[0].blockID ) {
						return data;
					} else if( data.error ){
						console.error( data.error );
						return false;
					}
				}
				else {
					return false;
				}
			}
			else {
				//removing data
				delete this.budgetID;
				let x, blocks = [], block;
				for( x = 0; x < blockIDs.length; x++ ){
					this.blockID 	= blockIDs[x];
					block			= await this.getTransBlock();
					
					if( block ){
						blocks.push( block );
					}
				}
				
				
				//removing data
				delete this.blockID;
				
				return blocks;
			}
		}
		else if( this.budgetID && this.noteTypeS ){
			let budgetID 		= this.budgetID;
			let noteType 		= this.noteTypeS;
			let budgetBlockIDs 	= JSON.parse( await this.isJsonable( await this.l[ this.budgetID ] ) ? await this.l[ this.budgetID ] : '[]' );
			let noteBlockIDs   	= JSON.parse( await this.isJsonable( await this.l[ this.noteTypeS ] ) ? await this.l[ this.noteTypeS ] : '[]' );
									
			//removing data;
			delete this.noteTypeS;
			delete this.budgetID;			
						
			let blockIDs 		= this.compare( budgetBlockIDs, noteBlockIDs, 'merge' );
			let blocks 			= [], x;
			for( x = 0; x < blockIDs.length; x++ ) {
				this.blockID = blockIDs[x];
				
				if( await this.l[ this.blockID ] )
					blocks.push( JSON.parse( await this.isJsonable( await this.l[ this.blockID ] ) ? await this.l[ this.blockID ] : '{}' ) );
				
				else {
					let data = await this.getData('blockID', this.blockID);
					if( data && data.blockID ){
						blocks.push( data );
					}
				}
			}
			
			//removing data
			delete this.blockID;
			
					
			return blocks;
		}
		else if( this.budgetID && this.transType ){
			let budgetID 		= this.budgetID;
			let transType 		= this.transType;
			let budgetBlockIDs 	= JSON.parse( await this.isJsonable( await this.l[ this.budgetID ] ) ? await this.l[ this.budgetID ] : '[]' );
			let noteBlockIDs   	= JSON.parse( await this.isJsonable( await this.l[ this.transType ] ) ? await this.l[ this.transType ] : '[]' );
									
			//removing data;
			delete this.transType;
			delete this.budgetID;			
						
			let blockIDs 		= this.compare( budgetBlockIDs, noteBlockIDs, 'merge' );
			let blocks 			= [], x;
			for( x = 0; x < blockIDs.length; x++ ) {
				this.blockID = blockIDs[x];
				
				if( await this.l[ this.blockID ] )
					blocks.push( JSON.parse( await this.isJsonable( await this.l[ this.blockID ] ) ? await this.l[ this.blockID ] : '{}' ) );
				
				else {
					let data = await this.getData('blockID', this.blockID);
					if( data && data.blockID ){
						blocks.push( data );
					}
				}
			}
						
			//removing data
			delete this.blockID;
			
			return blocks;
		}
		else if( this.noteTypeS && this.transType ){
			let noteType 		= this.noteTypeS;
			let transType 		= this.transType;
			let transBlockIDs 	= JSON.parse( await this.isJsonable( await this.l[ this.transType ] ) ? await this.l[ this.transType ] : '[]' );
			let noteBlockIDs   	= JSON.parse( await this.isJsonable( await this.l[ this.noteTypeS ] ) ? await this.l[ this.noteTypeS ] : '[]' );
			//removing data;
			delete this.noteTypeS;
			delete this.transType;
			let blockIDs 		= this.compare( transBlockIDs, noteBlockIDs, 'merge' );
			let blocks 			= [], x;
			for( x = 0; x < blockIDs.length; x++ ) {
				this.blockID = blockIDs[x];
				
				if( await this.l[ this.blockID ] )
					blocks.push( JSON.parse( await this.isJsonable( await this.l[ this.blockID ] ) ? await this.l[ this.blockID ] : '{}' ) );
				
				else {
					let data = await this.getData('blockID', this.blockID);
					if( data && data.blockID ){
						blocks.push( data );
					}
				}
			}
						
			//removing data
			delete this.blockID;
			
			return blocks;
		}
		else if( this.productID && this.noteTypeS && this.transType ) {
			let productID 	= this.productID;
			let noteType 	= this.noteTypeS;
			let transType 	= this.transType;
			let prodsBlockIDs = JSON.parse( await this.isJsonable( await this.l[ this.productID ] ) ? await this.l[ this.productID ] : '[]' );
			let transBlockIDs 	= JSON.parse( await this.isJsonable( await this.l[ this.transType ] ) ? await this.l[ this.transType ] : '[]' );
			let noteBlockIDs   	= JSON.parse( await this.isJsonable( await this.l[ this.noteTypeS ] ) ? await this.l[ this.noteTypeS ] : '[]' );
			let prodTransBlock 	= this.compare( prodsBlockIDs, transBlockIDs, 'merge' );
			let blockIDs 		= this.compare( prodTransBlock, noteBlockIDs, 'merge' );
			
			//removing data.
			delete this.productID;
			delete this.noteTypeS;
			delete this.transType;
			
			let blocks 			= [], x;
			for( x = 0; x < blockIDs.length; x++ ) {
				this.blockID = blockIDs[x];
				
				if( await this.l[ this.blockID ] )
					blocks.push( JSON.parse( await this.isJsonable( await this.l[ this.blockID ] ) ? await this.l[ this.blockID ] : '{}' ) );
				
				else {
					let data = await this.getData('blockID', this.blockID);
					if( data && data.blockID ){
						blocks.push( data );
					}
				}
			}
			
						
			//removing data
			delete this.blockID;
			
			return blocks;
			
		} 
		else if( this.sellCredit && this.transType ) {
			let sellCredit 	= this.sellCredit;
			let transType 	= this.transType;
			let sellBlockIDs = JSON.parse( await this.isJsonable( await this.l[ this.sellCredit ] ) ? await this.l[ this.sellCredit ] : '[]' );
			let transBlockIDs = JSON.parse( await this.isJsonable( await this.l[ this.transType ] ) ? await this.l[ this.transType ] : '[]' );
			let blockIDs 		= this.compare( sellBlockIDs, transBlockIDs, 'merge' );
			
			//removing data.
			delete this.sellCredit;
			delete this.transType;
			
			let blocks 			= [], x;
			for( x = 0; x < blockIDs.length; x++ ) {
				this.blockID = blockIDs[x];
				
				if( await this.l[ this.blockID ] )
					blocks.push( JSON.parse( await this.isJsonable( await this.l[ this.blockID ] ) ? await this.l[ this.blockID ] : '{}' ) );
				
				else {
					let data = await this.getData('blockID', this.blockID);
					if( data && data.blockID ){
						blocks.push( data );
					}
				}
			}
			
			
			//removing data
			delete this.blockID;
			
			return blocks;
		}
		else if( this.buyCredit && this.transType ) {
			let  buyCredit 	= this.buyCredit;
			let transType 	= this.transType;
			let buyBlockIDs = JSON.parse( await this.isJsonable( await this.l[ this.buyCredit ] ) ? await this.l[ this.buyCredit ] : '[]' );
			let transBlockIDs = JSON.parse( await this.isJsonable( await this.l[ this.transType ] ) ? await this.l[ this.transType ] : '[]' );
			let blockIDs 		= this.compare( buyBlockIDs, transBlockIDs, 'merge' );
			
			//removing data.
			delete this.buyCredit;
			delete this.transType;
			
			let blocks 			= [], x;
			for( x = 0; x < blockIDs.length; x++ ) {
				this.blockID = blockIDs[x];
				
				if( await this.l[ this.blockID ] )
					blocks.push( JSON.parse( await this.isJsonable( await this.l[ this.blockID ] ) ? await this.l[ this.blockID ] : '{}' ) );
				
				else {
					let data = await this.getData('blockID', this.blockID);
					if( data && data.blockID ){
						blocks.push( data );
					}
				}
			}
			
						
			//removing data
			delete this.blockID;
			
			return blocks;
		}
		else if( this.productID ){
			let blockIDs = JSON.parse( await this.isJsonable( await this.l[this.productID] ) ? await this.l[this.productID] : '[]' );
			let blocks 		= [], x;
			let productID 	= this.productID;
			
			//removing data 
			delete this.productID;
			
			for( x = 0; x < blockIDs.length; x++ ) {
				this.blockID = blockIDs[x];
				
				if( await this.l[ this.blockID ] )
					blocks.push( JSON.parse( await this.isJsonable( await this.l[ this.blockID ] ) ? await this.l[ this.blockID ] : '{}' ) );
				
				else {
					let data = await this.getData('blockID', this.blockID);
					if( data && data.blockID ){
						blocks.push( data );
					}
				}
			}
			
			
			//removing data 
			delete this.blockID;
			
			if( blocks.length == 0 ){
				let data = await this.getData('productID', productID);
				if( data && data.length && data[0].blockID ){
					return data;
				}				
			}
			
			return blocks;
		}
		else if( this.buyCredit ){
			let blockIDs = JSON.parse( await this.l[this.buyCredit] );
			let buyCredit 	= this.buyCredit;
			
			//removing data 
			delete this.buyCredit;
			
			let blocks 		= [], x;
			for( x = 0; x < blockIDs.length; x++ ) {
				this.blockID = blockIDs[x];
				
				if( await this.l[ this.blockID ] )
					blocks.push( JSON.parse( await this.l[ this.blockID ] ) );
				
				else {
					let data = await this.getData('blockID', this.blockID);
					if( data && data.blockID ){
						blocks.push( data );
					}
				}
			}
			
						
			//removing data
			delete this.blockID;
			
			if( blocks.length == 0 ){
				let data = await this.getData('buyCredit', buyCredit);
				if( data && data.length && data[0].blockID ){
					return data;
				}				
			}
			
			return blocks;
		}
		else if( this.sellCredit ) {
			let blockIDs = JSON.parse( await this.l[this.sellCredit] );
			let sellCredit 	= this.sellCredit;
			
			//removing data 
			delete this.sellCredit;
			
			let blocks 		= [], x;
			for( x = 0; x < blockIDs.length; x++ ) {
				this.blockID = blockIDs[x];
				
				if( await this.l[ this.blockID ] )
					blocks.push( JSON.parse( await this.l[ this.blockID ] ) );
				else {
					let data = await this.getData('blockID', this.blockID);
					if( data && data.blockID ){
						blocks.push( data );
					}
				}
			}
			
			//removing data 
			delete this.blockID;
			
			return blocks;
		}
		else if( this.transType ){
			let blockIDs = JSON.parse( typeof await this.l[this.transType] == "undefined" ? "{}" : await this.l[this.transType]  );
			let transType 	= this.transType;
			
			//removing data
			delete this.transType;
			
			let blocks 		= [], x;
			for( x = 0; x < blockIDs.length; x++ ) {
				this.blockID = blockIDs[x];
				
				if( await this.l[ this.blockID ] )
					blocks.push( JSON.parse( await this.l[ this.blockID ] ) );
				
				else {
					let data = await this.getData('blockID', this.blockID);
					if( data && data.blockID ){
						blocks.push( data );
					}
				}
			}
			
						
			//removing data 
			delete this.blockID;
			
			if( blocks.length == 0 ){
				let data = await this.getData( 'transType', transType );
				
				if( data && data.length && data[0].blockID ){
					return data;
				}
			}
			
			return blocks;
		}
		else if( this.noteTypeS ){
			let blockIDs = JSON.parse( typeof await this.l[this.noteTypeS] == "undefined" ? "{}" : await this.l[this.noteTypeS] );
			let noteType = this.noteTypeS;
			
			//removing data 
			delete this.noteTypeS;
			
			if( ( ! blockIDs || blockIDs.length == 0 ) && this.noteTypeS == "BTCCRD" ){
				//CREATE AND RETURN THE DEFAULT BITCOIN EXCHANGE BLOCK HERE.
			}
			
			let blocks 		= [], x;
			for( x = 0; x < blockIDs.length; x++ ) {
				this.blockID = blockIDs[x];
				
				if( await this.l[ this.blockID ] )
					blocks.push( JSON.parse( await this.l[ this.blockID ] ) );
				
				else {
					let data = await this.getData('blockID', this.blockID);					
					if( data && data.blockID ){
						blocks.push( data );
					}
				}
			}		
			
			//removing data
			delete this.blockID;
			
			if( blocks.length == 0 ){
				let data = await this.getData( 'noteType', noteType );
				
				if( data && data.length && data[0].blockID ){
					return data;
				}
			}
			
			return blocks;
		}
		
		let block;
		
		if( ! this.blockID )
			this.blockID = this.#note.blockID;

		
		
		if( await this.l[ this.blockID ] || localStorage[ this.blockID ] ){
			block 	= await this.l[ this.blockID ];
			
			if( ! block )
				block   = localStorage[ this.blockID ];
			
			if( ! block ){
				let data = await this.getData('blockID', this.blockID);	
				
				if( data && typeof data == 'object' && data.blockID ){
					return data;
				}
				else {
					return this.defaultBlock;
				}
			}
			
			delete this.blockID;			
						
			if( await this.l.block ) {
				block = await this.l.block;
				delete await this.l.block;
			}
			if( block && typeof block == 'string' && await this.isJsonable( block ) )
				return JSON.parse( block );
			
			else if( typeof block == 'object' )
				return block;
			
			else if( ! block || ! await this.isJsonable( block ) || typeof block == "undefined" )
				return this.defaultBlock;
		}		
		else if( ! this.blockID ){
			return this.defaultBlock;
		}
		else {
			//try using promise.
			let data = await this.getData('blockID', this.blockID);
			
			if( typeof data == 'object' && data.blockID && typeof data.blockID != "undefined" ) {
				return data;
			}
			
			else {
				return this.defaultBlock;
			}
		}
	}

		
	static async getTransactions( callback ){
		console.log("getTransactions running " + this.funcUp );
		this.funcUp = "getTransactions";
		if( this.key == undefined )
			this.key = 0;
		
		this.data = await this.l;
		let keys = Object.keys( this.data );
		let key 	= keys[ this.key ];
		let block = false;
		let x;
		
		if( key == undefined ) return;
		
		console.log( 'blcokkey: ' + key );
		//10000 * 10000 means an 100 million maximum loop
		for( x = 0; x < 10000; x++ ) {

			if( await this.stop )
				break;
			
			
			this.key++;
			key = keys[ this.key ];
			
			if( key == undefined ) break;
			
			if( key != 'personal' || key != 'account' || key != 'ScriptNotes' || key != null ) {
				let data 	= this.data[ key ];
				
				if( data && typeof data == 'string' && data.indexOf('{') == 0 && data.lastIndexOf('}') == ( data.length - 1 ) )
					block = JSON.parse( data );
				
				//handling the agreements on the note.
				this.response = block;
				/* this.handleAgreement();
				this.monitorScriptbillCredit(); */
				
				if( block && typeof block == 'object' )
					callback( block, this.key, this );
			}
			
		}
		
		this.key++;
		
		if( key != null || ! await this.stop )
			this.getTransactions(callback);
	}
	
	//this function is expected to run with a user Inputed password.
	static async changeLoginPassword( newPassword, oldPassword ){
		console.log("changeLoginPassword running " + this.funcUp );
		this.funcUp = "changeLoginPassword";
		this.#password = await this.#getPassword( oldPassword );
		
		//initializing storage.
		this.s 		= await this.initSessionStorage();
		this.l 		= await this.initStorage();
		
		if( await this.s.currentNote )
			this.#note = await this.#getCurrentNote();
		if( this.noteAddress ){
			this.#note = await this.#getNote();
		}
		
		if( ! this.#note ){
			console.error("Cannot Change The Login Password When The Current Note is Note Initialized!");
			return false;
		}
		
		this.#password = await this.#getPassword( newPassword );
		await this.saveNote();
		
		this.#note = await this.#getNote();
		
		if( this.#note && this.#note.noteAddress && this.#note.noteBudgets && this.#note.noteBudgets.length )
			return true;
		
		return false;
	}	
	
	//creating a product is just simply creating a transaction block optimized for product creation. For now we are not creating budgets
	static async create_product(){
		console.log("create_product running " + this.funcUp );
		this.funcUp = "create_product";
		console.log( "product Config: " + JSON.stringify( this.productConfig ) );
		
		//initializing storage.
		this.s 		= await this.initSessionStorage();
		this.l 		= await this.initStorage();
		
		//run Scriptbill function only if the product config has been truely configured.
		if( ! this.productConfig.value || ! this.productConfig.units || ! this.productConfig.name || ! this.productConfig.description ) return;
		
				
		if( await this.s.currentNote )
			this.#note = await this.#getCurrentNote();
		
		
		if( ! this.productConfig.totalUnits || this.productConfig.totalUnits < this.productConfig.units )
			this.productConfig.totalUnits = this.productConfig.units;
		
				
		if( this.productConfig.productID ){
			this.productID 		= this.productConfig.productID;
			let transBlock 		= await this.getTransBlock();
			
			if( transBlock ){
				transBlock  = await this.getCurrentBlock( transBlock );
				this.details 	= transBlock;
			}
			else {
				this.details  = JSON.parse( JSON.stringify( this.defaultBlock ) );
			}
		}
		else {
			this.details  = JSON.parse( JSON.stringify( this.defaultBlock ) );
		}
		
		let agreement 			= this.defaultAgree;
		agreement.productConfig = this.productConfig;
		
		this.details.transValue = this.productConfig.value;
		this.details.agreement = agreement;
		this.details.transType = 'CREATEPRODUCT';
		//the business manager key is the public key to the Business Manager'this.s note, where he will be recieving proceeds from the Profit SHaring on Scriptbill 
		//product
		if( this.#note.BMKey ){
			this.details.businessKey = this.#note.BMKey;
		}
		this.walletID 				= this.#note.walletID;
		return await this.generateScriptbillTransactionBlock();
	}
	
	static async buy_product( productID, value = 0 ){
		console.log("buy_product running " + this.funcUp );
		this.funcUp = "buy_product";
		//first look for the product on the Scriptbill database.
		this.productID = productID;
		let block = await this.getTransBlock();
		
		if( ! block || block.length < 1 ) {
			console.error("No Product Found Associated With This Product ID: " + productID + ". Please Check The Product ID and Try Again!");
			return false;
		}		
		
		if( block && block.length > 0 ) {
			let x, block1, block2, latest;//searching for the most recent of the blocks gathered using the transaction time as reference.
			for( x = 0; x < block.length; x++ ){
				block1 = block[x];
				
				if( block2 && block2.transTime < block1.transTime ){
					latest = block1;
				}
				else {
					latest = block2;
				}
				
				block2 = block1;
			}
			
			block = latest;
		}
		console.log( "block found " + block, "stringified " + JSON.stringify( block ) );
		let prodValue = 0;
		
		if( block.agreement && block.agreement.productConfig )
			prodValue = block.agreement.productConfig.value;
		
		else if( block.agreement && block.agreement.value )
			prodValue 	= block.agreement.value;
		
		else if( block.transValue )
			prodValue 	= block.transValue;
		
		if( block.noteServer ){
			let currentNote = await this.getData(["noteAddress", "#getNote"], [this.#note.noteAddress, block.productID], block.noteServer );
			
			if( currentNote && typeof currentNote == "string" ){
				await this.setPrivateKey( this.#note.noteSecret );
				let data 			= await this.#decrypt( currentNote );
				this.#currentNote 	= await this.isJsonable( data ) ? JSON.parse( data ) : false;
			}
		}
		
		if( ! this.#currentNote ){
			await this.#getCurrentNote();
		}
		
		
		this.details = JSON.parse( JSON.stringify( block ) );
		this.details.recipient = this.details.productID;
		//check if the current note has the value of the product.
		if( this.#note.noteValue >= prodValue && ! value ){
			
			this.details.transType = 'BUYPRODUCT';
			this.details.transValue = prodValue;
			return await this.generateScriptbillTransactionBlock();
		}
		else {
						
			if( ! value ) {
				let con = confirm( "Your Note Value is: " + this.#note.noteValue + " and you are about to purchase a product of value: " + prodValue + " You'll Need " + ( prodValue - this.#note.noteValue ) + " To Complete this Transaction Without a Credit. You Can Choose to Buy A Credit To Complete This Transaction or Continue With a Scriptbank Credit and Pay a Compound Interest of " + ( this.interestRate * 100 ) + "% Daily. Click Okay To Continue the transaction as a credit and Cancel to Subscribe to this Product..." );
				
				if( ! con ){
					this.details.transValue = this.#note.noteValue;
					this.details.transType = 'PRODUCTSUB';
					this.details.subConfig = await this.subConfig;
					this.details.subConfig.value = this.details.transValue;
					this.details.subConfig.productID = this.details.productID;
				}
				else {
					this.details.transType = "BUYPRODUCT";
					this.details.transValue = prodValue;					
				}
			}
			else {
				this.details.transValue = value;
				this.details.transType = 'PRODUCTSUB';
				this.details.subConfig = JSON.parse( JSON.stringify( await this.subConfig ) );
				this.details.subConfig.value = this.details.transValue;
				this.details.subConfig.productID = this.details.productID;
			}
			
			
			return await this.generateScriptbillTransactionBlock();
			
		}	
		
	}
	
	static async profitSharing( block ){
		console.log("profitSharing running " + this.funcUp );
		this.funcUp = "profitSharing";
		//the block must be configured as an object for the function to work and not an array.
		if( typeof block != 'object' || block.length ) return;
		
		//initializing storage.
		this.s 			= await this.s;
		this.l 			= await this.l;
		
		if( await this.s.currentNote )
			this.#note = await this.#getCurrentNote();
		
		if( ! this.#note && ! this.#note.noteAddress ) return;
		
		
		//the block must be a product block for Scriptbill to work or it must also be a profit sharing block for 
		//upline sharing and the block must 		
		if( ( ( ! block.productID && ! block.blockKey && ! block.recipient ) || block.transType != 'PROFITSHARING' ) ) return;		
		
		let agreement = null, productKey;
		
		for( x = 0; x < this.#note.profitKeys.length; x++ ){
			//set the block private keys.
			await this.setPrivateKey( this.#note.profitKeys[x] );
			agreement = await this.#decrypt( block.recipient );
			
			if( await this.isJsonable( agreement ) ){
				agreement = JSON.parse(agreement);
				productKey = await this.getPublicKey();
			}
			else {
				agreement = null;
			}
		}
		
		//if the agreement wasn't succesfully decrypted, then the profit wasn't for us.
		if( ! agreement ) return;
		
		block.agreement = JSON.parse( JSON.stringify( agreement ) );
		
		this.details 			= JSON.parse( JSON.stringify( this.defaultBlock ) );
		this.details.recipient 	=  this.#note.BMKey.length > 0 && (block.transType == 'BUYPRODUCT' || block.transType == 'PRODUCTSUB') ? this.#note.BMKey : block.blockKey;
		this.details.agreement 	= block.agreement;
		//the transaction value is based on the transaction type. The first benefitiary of the transaction is the business manager 
		//note. Who will get the sharingrate of the shared profit gotten.
		this.details.transValue = block.transType == 'BUYPRODUCT' || block.transType == 'PRODUCTSUB' ? ( ( block.transValue * block.agreement.sharingRate ) * block.agreement.sharingRate ) : ( block.transValue * block.agreement.sharingRate );
		this.details.origValue 	= block.transType == 'BUYPRODUCT' || block.transType == 'PRODUCTSUB' ? ( block.transValue * block.agreement.sharingRate ) : block.transValue;
		this.details.productKey = productKey;
		this.details.transType 	= 'PROFITRECIEVE';
		this.details.noteValue 	= this.#note.noteValue;		
		this.details.nextRecipient = (block.transType == 'BUYPRODUCT' || block.transType == 'PRODUCTSUB') ? '' : block.formerProductBlockID;
		return await this.generateScriptbillTransactionBlock();
		
		//if the transaction type is a buyproduct or productsub transaction, then we pay the recipient after we have paid the business
		//manager.
		if( ( block.transType == 'BUYPRODUCT' || block.transType == 'PRODUCTSUB' ) && this.#note.BMKey ){
			this.details.recipient = block.blockKey;
			this.details.transValue = this.details.transValue * block.agreement.sharingRate;
			this.details.origValue = this.details.transValue;
			this.details.nextRecipient = block.formerProductBlockID;
			return await this.generateScriptbillTransactionBlock();
		}
	}

	/*
		Logining in a user to the server will be done with the user'this.s walletID as the username, the user'this.s password and the note address.
		If the user note address is not found, the user may be logeddin to the Scriptbill Application but will not be able to use any funds associated with that account 
		on the app. 
	*/
	static async loginUserDetails(){
		console.log("loginUserDetails running " + this.funcUp);
		this.funcUp = "loginUserDetails";
		
				
		if( ! this.#password ) {
			this.#password 	= await this.#getPassword();
			
			if( ! this.#password )
				return; 
		}
		
		if( ! CryptoJS || ! CryptoJS.MD5  ) {
			console.error('CryptoJS Hashing Libraries Are Needed To Log You In Securely. Please Include and Rerun Scriptbill Class Again!!!');
			return false;
		}
		
		console.log( "personal: " + await this.l.personal, "string: " + this.string, "hash: " + await this.hashed() );
		if( await this.l.personal ){
			let local = JSON.parse( await this.l.personal );
			let blockID, note, noteBlock, noteHash;
			
			if( local ){
				
				let localHash 	= local.hash;
				delete local.hash;
				this.string 	= JSON.stringify( local ) + this.#password;				
				let hash 		= await this.hashed();

				if( hash != localHash ) {
					//if we don't trust the local data we use the database information.
					if( await this.s.currentNote ){
						note = JSON.parse( await this.s.currentNote );						 
						noteBlock = JSON.parse( await this.l.data );
						noteHash =  noteBlock.walletHASH;
							
						//the current block of a particular wallet carries the current walletHASH and it'this.s signature.
						//if the hash gotten is not equal to the hash saved, then there is a tamper error on the wallet
						//Scriptbill may have to block the wallet from taken anymore transaction.
						//Scriptbill shows that there is no tamper error on the walletHASH, the fault came from the client who had entered a wrong password
						if( noteHash == localHash ){
							console.error('Password Entered Was Incorrect and Won\'t Be Able To Decrypt Important Note Information!!!');
							return;
						}
						else{
							console.error('Invalid Scriptbill Note or Password!!!');
							return;
						}
								
					}
					else {
						console.error(' Incorrect Password Entered!!! ');
					}
				}
				else {
					//the user has proven that he is the rightful owner of the current wallet.
					//if the note aaddress is supplied, we attempt getting the note from his local server.
					
					if( this.noteAddress ){
						await this.setPrivateKey( localHash );
						this.#password = await this.#decrypt( local[ this.noteAddress ].password );
						this.#note = await this.#getNote();
						
						if( this.#note && typeof this.#note == 'object' && this.#note.noteAddress == this.noteAddress ) {
							await this.successMessage('Scriptbill Note Successfully Found. Scriptbill Now Initializing!!!');
							await this.shareData();
						}
						return;
					}
					else {
						this.defaultScriptbill.walletID = this.walletID;
						this.createNewScriptbillWallet();
						return;
					}
				}

				let url = new URL( this.#default_scriptbill_server );
				url.searchParams.set('walletHASH', hash);
				url.searchParams.set('transTime', local.transTime);
				try {
					fetch( url).then( response =>{
						return response.text();
					}).then( async result =>{
						
						if( await this.isJsonable( result ) ) { 
							this.response = JSON.parse( result );
							this.recieveData();
						}
					});
				} catch(e){
					console.error("Cannot fetch " + e);
				}				
							
			}
			
			else {
				local = {};
				local.walletID = this.walletID;
				local.transTime = await this.currentTime();
				local.password 	= this.#password;
				this.string = JSON.stringify( local );
				local.hash	= await this.hashed();
				this.l.personal = JSON.stringify( local );
			}
		}
		
	}
	
	//invest on a budget or company.
	//when creating a budget, it will be added as a product in the database
	//this will avoid it being expired after a long time as long as the stocks are being 
	//traded, the transaction block or the budget will remain active in the database.
	static async invest( budgetID, value ){
		console.log("invest running " + this.funcUp );
		this.funcUp = "invest";
		this.budgetID 			= budgetID;
		
		//this will get the most recent transaction block that carries the budget.
		let productBlock 		= await this.getTransBlock();
		
		if( productBlock && typeof productBlock == 'object' && productBlock.budgetID == this.budgetID ) {
			let agreement = productBlock.agreement;
			
			if( typeof agreement != 'object' )
				agreement = JSON.parse( agreement );
			
			if( agreement ){
				//the budget must have Scriptbill variable to be true, value, items, investors pouch
				let budget = typeof agreement == 'string' ? JSON.parse( agreement ) : agreement;
				
				if( budget.value && budget.budgetItems && budget.investorsHub ){
					//looop through the items to be sure that it is a valid item.
					let items = typeof budget.budgetItems == 'string' ? JSON.parse( budget.budgetItems ) : budget.budgetItems;
					let itemDetails, values = 0;
					for( itemID in items ){
						itemDetails = typeof items[ itemID ] == 'string' ? JSON.parse( items[ itemID ] ) : items[ itemID ];
						
						if( itemDetails.itemValue && itemDetails.itemName && itemDetails.scriptbillAddress && itemDetails.description ) {
							values += itemDetails.itemValue;
						}
					}
					
					//the budget value may be escalated by investors, or the proprietor of the 
					//bsuiness, so may be larger than the item values;
					if( values <= budget.value ){
						this.details = JSON.parse( JSON.stringify( this.defaultBlock ) );
						this.details.transValue = value;
						
						if( this.details.transType == "CREATE" )
							this.details.transType = 'INVEST';
						
						this.details.recipient = this.stockNoteAddress ? this.stockNoteAddress: budgetID;
						this.details.agreement = agreement;
						return await this.generateScriptbillTransactionBlock();
					}
				}
			}
		}
	}
	
	static budgetConfig = {
		"name"					: "", //unique name for the budget, can be a business or website name.
		"value"					: 0, //the total value of a Scriptbill Budget. Always Used to Increase stock value manually
		"max_exec"				: "1 Month", //maximum time the budget would execute.
		"budgetID"				: "",//the public Key of the Budget,the private ke would be set on the note with the block ID where the budget is kept.
		"sleepingPartner" 		: "percent-low", //this is the description for a sleeping investor.
		"workingPartner"		: "perent-high", //this is the description for a working investor.
		"sleepingPartnerShare"	: 0.1, //this is the rate that describes the sleepig investor share.
		"workingPartnerShare"	: 0.1, //this is the rate that describes the sleepig investor share.
		"budgetItems"			: [],//items that are in the budget that constitute the budget
		"budgetSign"			: "", //the signature on the budget
		"budgetRef"				: "",//reference to the budget signature.
		"budgetType"			: "personal", // "personal" & "family" tells that this budget 
		//is not business related budget and won't accept investment. Any investment to this budget type will not 
		//issue any stocks. "governmental" budget will issue bonds not stocks to the investor and used by 
		//business managers and any persons or organization who support the economy, business budget will issue stocks to investor.
		"orientation"			: "straight",//telling whether this budget is a "straight" or "recursive" 
		//budget. If straight the budget block expires when the budget executes. but if recursive, the budget 
		//block will renew until the time for the recursion stops.
		"recursion"				: Infinity,//used to describe how many times the budget will execute if the budget is a recursive budget
		"budgetSpread"			: "1 week", //time required for the budget to spread after it has executed. Works for a recursive budgetType
		"budgetCredit"			: "SBCRD", //the acceptable credit for investing and executing this budget. Budget credit should be set according to how the item in the budget is valued.
		"budgetDesc"			: "", //the description of the budget. This will give investors view of what product or products that will be produced under this budget, and everything investors need to know about this budget.
		"budgetImages"			: [],//array of image url that can describe the budget products and effects.
		"budgetVideos"			: [], //array of videos that describe the budgets to investors.
		"companyRanks"			: [],//rank codes that will be occupied by users in the company. If you are employed in the company, a special rank code will be assigned you and the public key stored on the budget block
		"stockID"				: "SBSTK",//default scriptbill stocks code.
		"investorsHub"			: [],//an array of hashes that can only be verified by people who hold stocks to this budget. This hash also test for the values on their stock note.
		//if an investor sell his stock, the exchange market must test to see if the stock is 
		//true by testing the hashes, deduct the sold value from his account, issue out money 
		//to the seller and updating the hub hashes if only the investor hash stocks with the company who owns this budget. InvestorHub works majorly for business and 
		//governmental budget types. Personal and Family budget types will not trade their 
		//stocks because it does not have a real business value.
		'agreement'				: this.defaultAgree,//describes the extra agreenebt the budget creator would like to have with 
		//their investor. This should only be configured using the this.defaultAgree option.
		
	};
	
	static defaultItem  = {
		"itemName"	: "Scriptbill Adverts",//the name of the item, note really neccessary but used to ID the item on the budget
		"itemValue"	: 10,
		"itemProduct"	: "", //the product ID that would be affected when this item is executed.
		"scriptbillAddress"	: "SCRIPTBILLADVERTS", //this is the scriptbill note address of the item. If this is empty, the create budget function will automatically create a Scriptbill note and send to the recipient
		"businessName"	: "",//the business name or storeID of the business that wants to sell this item. storeID is not a Scriptbill language but a Scriptbank System of storing businesses in the network. Scriptbill recognizes business using their noteAddress or budget ID.
		"itemCredit"	: "NGNCRD",//the credit if the product that would be purchase by the 
		//note. Most of the time, the credit is in fiat, especially at the early stages of 
		//scriptbill.
		"businessPhone"	: "",//phone number of the merchant.
		"businessEmail"	: "info@scriptads.ml",//email address of the merchant
		"businessAddress"	: "",//the street address of the merchant'this.s business
		"businessRegion"	: "",//the region where the business resides.
		"businessCountry"	: "Nigeria",//the country where the business resides.
		"execTime"			: "1 month", //time when this item would execute
		"time"				: this.currentTime(), //the time the item was created
	};
	
	//this function allows a user to employ a Scriptbill worker to his own company. This will allow the user buy 
	//stocks from the company with special priviledges.
	static async employScriptbillWorker( budgetID, workerNote ){
		console.log("employScriptbillWorker running " + this.funcUp );
		this.funcUp = "employScriptbillWorker";
		if( ! this.#note || ! this.#note.noteBugdets  || ! this.#note.noteBudgets.length || ! this.#note.noteBudgets.includes( budgetID ) ) return false;
		
		this.budgetID = budgetID;
		let budgetBlock = await this.getTransBlock();
		
		if( ! budgetBlock || ! budgetBlock.agreement ){
			console.error("You can't employ a worker to the a Budget that Doesn't Exist. Please Check the Budget ID and Try Again. Budget ID worked with is: " + budgetID );
			return false;
		}
		
		let agreement = budgetBlock.agreement;
		let privKey 	= await this.generateKey(30);
		await this.setPrivateKey( privKey );
		let pubKey 		= await this.getPublicKey();
		await this.setPrivateKey( pubKey );
		agreement.companyRanks.push( await this.getPublicKey() );
		budgetBlock.agreement = agreement;
		this.details	 	= budgetBlock;
		this.details.transType = "EMPLOY";
		this.details.transValue = 0;
		this.details.noteValue = this.#note.noteValue;
		this.details.recipient = workerNote;
		return await this.generateScriptbillTransactionBlock();	
	}
	
	//before calling this function please set the budget Config variable to your desired value
	static async createScriptbillBudget(){
		console.log("createScriptbillBudget running " + this.funcUp );
		this.funcUp = "createScriptbillBudget";
		
		//initializing storage.
		this.s 			= await this.s;
		this.l 			= await this.l;
		
		if( await this.s.currentNote )
			this.#note = await this.#getCurrentNote();
		
		//we need at least the name and value set before continuing
		if( ! this.budgetConfig.name || ! this.budgetConfig.value ) return false;	
		
				
		let budgetItems = this.budgetConfig.budgetItems;
		let x, item, found = false, value = 0;
		let time 	=  parseInt( await this.currentTime() );
		let maxExecTime;
		let budgetID;
		
		//we loop through the budget items to calculate the value and check if an advert budget was included
		if( budgetItems.length > 0 ){
			for( x = 0; x < budgetItems.length; x++ ) {
				item = budgetItems[ x ];
				
				if( item.itemCredit != this.budgetConfig.budgetCredit ){
					item.itemValue = item.itemValue * await this.getExchangeValue( this.budgetConfig.budgetCredit, item.itemCredit )[0];
				}
				
				value += item.itemValue;
				if( item.itemName == 'Scriptbill Adverts' )
					found = true;
				
				if( typeof item.execTime == 'string' ){
					maxExecTime = parseInt( await this.currentTime() ) + parseInt( this.calculateTime( item.execTime ));
					item.execTime = time + maxExecTime;
				}
			}
		}
				
		if( typeof this.budgetConfig.max_exec == 'string' ) {
			maxExecTime = parseInt( await this.currentTime() ) + parseInt( this.calculateTime( this.budgetConfig.max_exec ) );
			
			if( maxExecTime ){
				this.budgetConfig.max_exec = time + maxExecTime;
			}
		}
		
		if( ! found ){
			//check the budget credit.
			let itemCredit = this.budgetConfig.budgetCredit;
			let itemValue  = this.defaultItem.itemValue;
			
			if( itemCredit != "SBCRD" ){
				itemValue = ItemCredit * await this.getExchangeValue( itemCredit, "SBCRD" )[1];
			}
			
			value 		+= itemValue;
			
			this.defaultItem.itemValue = itemValue;
			if( typeof this.budgetConfig.budgetItems != 'object')
				this.budgetConfig.budgetItems = [];
			
			this.budgetConfig.budgetItems.push( this.defaultItem );
		}
		
		//reconfiguring the value of the budget to equal the actual value of items in the budget.
		if( this.budgetConfig.value != value )
			this.budgetConfig.value = value; 
		
		let isFound = false;
		//generate the budget id.
		if( this.budgetConfig.budgetID ) {			
			for( x = 0; x < this.#note.noteBudgets.length; x++ ){
				await this.setPrivateKey( this.#note.noteBudgets[x] );
				budgetID 	= await this.getPublicKey();
				if( this.budgetConfig.budgetID == budgetID ){
					isFound		= true;
					budgetID 	= this.#note.noteBudgets[x];
				}					
			}
		} 
		
		if( ! isFound ){
			budgetID  = await this.generateKey( 20 );
			await this.setPrivateKey( budgetID );
			this.budgetConfig.budgetID = await this.getPublicKey();
			this.#note.noteBudgets.push( budgetID );
			
			if( ! this.#note.budgetID )
				this.#note.budgetID 	= this.budgetConfig.budgetID;//stores the current budget id
			
			else if( this.budgetConfig.budgetType == "business" || this.budgetConfig.budgetType == "governmental"  ){
				this.#note.budgetID 	= this.budgetConfig.budgetID;
			}
			this.details.transType = "CREATEBUDGET";
		} else {
			this.details.transType = "UPDATEBUDGET";
		}
		
		this.details 			= JSON.parse( JSON.stringify( this.defaultBlock ) );
		
		this.details.agreement = this.budgetConfig;
		this.details.recipient = this.budgetConfig.budgetID;
		this.details.expiry		= this.budgetConfig.max_exec;
		this.details.transValue = this.budgetConfig.value;
		this.details.budgetID 	= budgetID;
		return await this.generateScriptbillTransactionBlock();
	}
	
	//to run auto investment. we run it locally on the server first and the network gets to know based on the 
	//transactional data sent afterwards
	static async autoInvestScriptbillBudget(){
		console.log("autoInvestScriptbillBudget running " + this.funcUp );
		this.funcUp = "autoInvestScriptbillBudget";
		
		//initializing storage.
		this.s			= await this.s;
		this.l 			= await this.l;
		
		if( await this.s.currentNote )
			this.#note = await this.#getCurrentNote();
		
		//testing to see if a scriptbill note is set and has budget on which could run with
		if( ! this.#note || this.#note.noteBudgets.length <= 0 ) return false;
		
		let budgets = this.#note.noteBudgets;
		let budgetKey, budgetID, budgetValue = 0;
		let budgetBlock, budget;
		let x, item;
		let time = await this.currentTime(), week	= 604800, day 	= 86400, hour 	= 3600;
		let execTime, itemExec, execResult, value = 0;
		let noteValue = this.#note.noteValue;
		
		for( x = 0; x < budgets.length; x++ ){
			budgetKey = budgets[x];
			await this.setPrivateKey( budgetKey );
			this.budgetID = await this.getPublicKey();			
			budgetBlock = await this.getTransBlock();
			
			if( budgetBlock ){
				budget 		= budgetBlock.agreement;
				//for auto investment to work, the budget must belong to a valid product
				//a governmental budget type will only attract investment from investors in the bond market
				//auto investment will not work with such budget.
				if( budget.budgetType != "straight" || budget.budgetType != "recursive" ) 
					continue;			
			
				budgetValue = budget.value;
				
				//check the execution time for each item, we will invest on budget whose execution time is at 
				//least three weeks
				execTime = budget.max_exec;
				
				let budgetItems = budget.budgetItems;
				for( y = 0; y < budgetItems.length; y++ ){
					item 	= budgetItems[y];
					execResult = item.execTime - time;
					
					//any item lesser than 4 weeks in the execution time 
					if( ( execResult / week ) < 4 ) continue;
					
					value += item.itemValue;
				}
				
				if( value ) {
					if( budget.budgetCredit != "SBCRD" )
						value = value * await this.getExchangeValue( budget.budgetCredit, "SBCRD" )[1];
					
					//checking the note value
					//we can only auto invest if the value on the note is lesser than the budget value.
					if( value > noteValue ){
						value -= parseFloat( noteValue );
						//to invest we check if the BM Key is there to create the transaction.
						if( this.#note.BMKey && this.#note.BMKey != "" ) {
							this.details   			= this.defaultBlock;
							this.details.transType 	= "INVEST";
							this.details.transValue = value;
							this.details.noteType   = budget.budgetCredit;
							this.details.recipient  = budget.budgetID;
							budget.recipient 		= this.#note.BMKey;
							this.details.agreement  = budget;
							return await this.generateScriptbillTransactionBlock();
						}
					}
				}
			}
			
			
		}
	}
	
	static async getBudgetBlocks(){
		console.log("getBudgetBlocks running " + this.funcUp );
		this.funcUp = "getBudgetBlocks";
		
		//initializing storage
		this.s 		= await this.s;
		this.l 		= await this.l;
		
		if( await this.s.currentNote )
			this.#note = await this.#getCurrentNote();
		
		if( ! this.#note || ! this.#note.budgetID ) return false;
		
		this.budgetID = this.#note.budgetID;
		let budgetBlocks = await this.getTransBlock();
		
		if( ! budgetBlocks ) {
			console.error("No Budget Block(this.s) is Found. Create a Budget and Try again ");
			return false;
		}
		
		return budgetBlocks;
	}
	
	static async monitorScriptbillStock(){
		console.log("monitorScriptbillStock running " + this.funcUp );
		this.funcUp = "monitorScriptbillStock";
		if( ( ! this.response || ! this.response.blockID ) && ( ! this.#note || ! this.#note.noteType.includes("STK") && ! this.response.productID ) ) return false;
		
		//get the budget ID of the current stock to know if the current product block belongs to the current budget.
		this.budgetID 	= this.#note.budgetID;
		let budgetBlock	= await this.getTransBlock();
		
		//this may show that the current budget have been updated by the note that created this
		//budget, so we check the update budget transaction.
		if( ! budgetBlock ){
			this.budgetID 	= this.#note.budgetID;			
			this.transType 	= "UPDATEBUDGET";
			budgetBlock		= await this.getTransBlock();
			
			//this shows that the budget is not existence in the netowrk so we abort the
			//transaction.
			if( ! budgetBlock ) {
				console.error( "This Stock note with budget ID: " + this.#note.budgetID + " appears to be invalid! Budget Associated with the stock was not found. Please contact the company you bought this stock from for assistance."); 
				return false;
			}
			else {
				this.noRequest 	= true;
				budgetBlock 	= await this.getCurrentBlock( budgetBlock );
			}
		}
		
		let products 	= budgetBlock.budgetProducts;
		let budget		= budgetBlock.agreement;
		let x, productID, pay, productBlock, prodAgree, soldValue, purchaseValue, y, item, profitRate, profit, stockProfit;
		
		if( products.indexOf( this.response.productID ) ) {
			productID 	= this.response.productID;
			//the pay value of the stock describe the amount from the profit that would be paid to the stock note per transaction.
			pay			= this.#note.pay;
			//to get the right amount of money to be paid, the profit from this transaction must be calculated.
			//to get the right profit, we have to get the product block to understand the value
			this.productID 		= productID;
			producBlock			= await this.getTransBlock();
			prodAgree			= productBlock.agreement;
			soldValue 			= prodAgree.units * prodAgree.value;
			//to get the profit rate we need to get the purchase value of the product. we'll have to loop through the budget items
			//to find the purchase value.
			purchaseValue = 0;
			for( y = 0; y < budget.budgetItems.length; y++ ){
				item = budget.budgetItems[y];
				if( item.itemProduct == productID ){
					purchaseValue 	+= item.itemValue;
				}
			}
				
			//we can now calculate the profit we get from the profit rate gotten through the purchase value.
			profitRate		= (soldValue - purchaseValue)/soldValue;
			profit			= this.response.transValue * profitRate;
			stockProfit 	= profit * pay;
			
			//letting the budget block discoverable.
			this.budgetBlock 		= budgetBlock;
			
			//generate a transaction that will pay up the mother note of this stock.
			this.details 			= this.defaultBlock;
			this.details.recipient = this.#note.motherKey;
			this.details.transType = "STOCKPAY";
			//the block verifiers will need the stock note to reference the budget in his transactional request to confirm the 
			//transaction. to do this, we need to provide both the budgetID and stock hashes.
			this.string				= this.#note.stockKey + this.#note.pay + this.#note.noteValue;
			this.details.reference	= await this.hashed();
			this.details.budgetID	= budget.budgetID;
			this.details.transValue = stockProfit;
			this.details.noteType 	= budget.budgetCredit;
			this.details.blockID	= this.response.blockID;
			return await this.generateScriptbillTransactionBlock();			
		}		
	}
	
	//the stock ID, if the stock will be bought directly from the note.
	//the value of stock you want to buy
	//the noteAddress if the stock will be bought from a stock note holder. the note address should be the 
	//note address of the recipient stock. the recipient mother key will be used to recieve the funding.
	static async buyScriptbillStocks( stockID, value ){
		console.log("buyScriptbillStocks running " + this.funcUp );
		this.funcUp = "buyScriptbillStocks";
		if( this.#note.noteType.includes("STK") || this.#note.noteType.includes("BND") ){
			console.error("You Can't Use A Stock or Bond Note To Purchase a Scriptbill Stock! Please Try Again With a Valid Credit Note.");
			return false;
		}
		
		if( this.#note.noteValue < value ){
			console.error("You don't have sufficient Scriptbill Credit to Complete this Transaction!");
			return false;
		}
		
		this.budgetID 	= stockID;
		this.transType 	= "CREATEBUDGET";
		let stockBlock 	= await this.getTransBlock();
		
		//This only show that the budget may have been updated by the note that creates it.
		if( ! stockBlock ){
			this.budgetID 	= stockID;
			this.transType 	= "CREATEBUDGET";
			stockBlock 	= await this.getTransBlock();
			
			if( ! stockBlock ) {
				console.error("Sorry, No Transaction Block Was Found Associated With Ths Stock Note!");
				return false;
			}
			else {
				this.noRequest 	= true;
				stockBlock 		= await this.getCurrentBlock( stockBlock );
			}
		}
		
		let budget 	= stockBlock.agreement;
		this.budgetID 	= stockID;
		let stockBlocks = await this.getTransBlock();
		
		if( budget.budgetType != "business" ){
			console.error("The Stock ID " + stockID + " Was Not Found Associated With Any Valid Scriptbill Stock. Please Check and Try Again or Contact Your Company");
			return false;
		}
		
		//trying to get the stock seller'this.s address;
		let x;
		this.stockNoteAddress 	= false;
		for( x = 0; x < stockBlocks.length; x++ ){
			
			stockBlock		= stockBlocks[x];
			
			if( stockBlock.transType == "SELLSTOCK" ){
				this.blockRef = stockBlock.blockRef;
				let blocks = await this.getTransBlock();
				let soldstock = false, x;
				
				if( blocks && blocks.length ){
					for( x = 0; x < blocks.length; x++ ){
						if( blocks[x].transType == "SOLDSTOCK" )
							soldstock = true;
					}
				}
				
				if( ! soldstock ){
					this.stockNoteAddress = stockBlock.blockKey;
					break;
				}
			}
		
		}
		
		this.defaultBlock.transType = "BUYSTOCK";		
		return this.invest( stockID, value );
	}
	
	//function to sell your current scriptbill stock at a particular stock rate.
	//stock rate is not equal to the rate of stock you want sold, but to the rate of
	//stock you have tjat you want sold. If your stock rate is 1, this means you want the 
	//whole of your stock sold.
	static async sellScriptbillStocks( stockRate ){
		console.log("sellScriptbillStocks running " + this.funcUp );
		this.funcUp = "sellScriptbillStocks";
		
		//initializing storage.
		this.s		= await this.s;
		this.l 		= await this.l;
		
		if( stockRate > 1 ){
			console.error("Please Set Your Stock Rate equal to or Lesser Than 1!");
			return false;
		}
		
		if( await this.s.currentNote )
			this.#note = await this.#getCurrentNote();
		
		if( ! this.#note || this.#note.noteType.lastIndexOf( "STK" ) != ( this.#note.noteType.length - 3 ) ) {
			console.error("Only Scriptbill Stock Note Can Sell a Scriptbill Stock");
			return false;
		}
		
		if( stockRate > 1 ){
			console.error("Your Stock Rate can't be Greater than 1!!");
			return false;
		}
		
		let stockValue = this.#note.noteValue * stockRate;
		
				
		if( ! this.#note.budgetID ){
			console.error("Your Stock note doesn't Appear to Be Valid. No Budget ID Stored on this Note. Please Contact Your Company For Rectification!");
			return false;
		}
		
		this.budgetID 		= this.#note.budgetID;
		let budgetBlocks  	= await this.getTransBlock();
				
		if( ! budgetBlocks || ! budgetBlocks.length || ! budgetBlocks[0].agreement || ! budgetBlocks[0].agreement.value ){
			console.error("Your Stock note doesn't Appear to Be Valid. No Budget Block Was Found Associated With The Budget ID on this Note!");
			return false;
		}
		
		if( ! budgetBlocks[0].agreement.budgetType || budgetBlocks[0].agreement.budgetType != "straight" ||  budgetBlocks[0].agreement.budgetType != "recursive" || ! budgetBlocks[0].agreement.budgetProducts || ! budgetBlocks[0].agreement.budgetProducts.length || ! budgetBlocks[0].agreement.budgetProducts.length > 0 ){
			console.error("Your Stock note doesn't Appear to Be Valid. The Budget on Your Stock Note Does Not Appear to Belong To a Valid Company!");
			return false;
		}
		
		let x, budgetBlock = false, buyBlocks, y, sold = false;
		
		for( x = 0; x < budgetBlocks.length; x++ ){
			
			if( budgetBlocks[x].transType != "BUYSTOCK" ) continue;
			
			budgetBlock = budgetBlocks[x];
			this.blockRef = budgetBlock.blockRef;
			buyBlocks 		= await this.getTransBlock();
			
			if( buyBlocks && buyBlocks.length ) {
				for( y = 0; y < buyBlocks.length; y++ ) {
					if( buyBlocks[x].transType == "SOLDSTOCK" ){
						sold = true;
						break;
					}
				}
			}
			if( ! sold  ){
				//check the transaction value to be equal to the stock value.
				let transValue = budgetBlock.agreement.value * stockValue;
				
				if( budgetBlock.transValue >= transValue  ){					
					break;
				}
				else {
					budgetBlock = false;
				}
					
			}
				
		}
		
		if( ! budgetBlock || ( budgetBlock && sold ) ){
			this.noRequest 		= true;
			budgetBlock 		= await this.getCurrentBlock( budgetBlocks );
			this.details 		= JSON.parse( JSON.stringify( budgetBlock ) );
			this.details.recipient = this.#note.budgetID;
			this.details.transValue = budgetBlocks[0].agreement.value * stockValue;
			this.details.transType	= "SELLSTOCK";
		}
		else if( budgetBlock && ! sold && budgetBlock.transType == "BUYSTOCK" ) {
			this.details 			= JSON.parse( JSON.stringify( budgetBlock ) );
			this.details.recipient = budgetBlock.blockKey;
			this.details.transValue = budgetBlock.agreement.value * stockValue;
			this.details.transType	= "SOLDSTOCK";
		}
		
		this.isBudget 			= true;		
		this.details.stock		= this.#note.noteValue;
		this.details.pay 		= stockValue;		
		return await this.generateScriptbillTransactionBlock();
	}
	
	static async buyScriptbillBonds( value ){
		console.log("buyScriptbillBonds running " + this.funcUp );
		this.funcUp = "buyScriptbillBonds";
		
		//initializing storage.
		this.s 			= await this.s;
		this.l			= await this.l;
		
		if( await this.s.currentNote )
			this.#note = await this.#getCurrentNote();
			
		if( ! this.#note ){
			console.error("Can't Purchase a Valid Scriptbill Note Data!!!");
			return false;
		}
		
		if( this.#note.noteValue < value ){
			console.error("You don't have sufficient Scriptbill Credit to Complete this Transaction!");
			return false;
		}
		
		let block;
		if( this.response && this.response.blockID && this.response.noteType == this.#note.noteType )
			block = this.response;
		
		else
			block = await this.getTransBlock();
		
		if( ! block ){
			console.error("Can't Buy Scriptbill Bonds without a Valid Scriptbill Block Data!!!");
			return false;
		}
		
		//when creating a governmental budget, only an exchange note can do that.
		this.#currentNote 	= JSON.parse( JSON.stringify( block.exchangeNote ) );
		this.#currentNote.noteAddress = block.exchangeNote.exchangeID;
		this.#currentNote.noteSecret 	= block.exchangeNote.exchangeKey;
		
		this.budgetID 	= this.#currentNote.budgetID;
		let blocks 		= await this.getTransBlock();
		
		if( ! blocks || ! blocks.length ){
			console.error("No Transaction Block Was Found Associated With The Current Bond With This ID: "+this.#currentNote.budgetID+"!");
			return false;
		}
		
		//confirming if it is a bond block.
		let budget 		= blocks[0].agreement;
		
		if( budget.budgetType != "governmental" ){
			console.error( "The Current Bond With ID: " + this.#currentNote.budgetID + " Can't be Bought as a Bond. Please Try Purchasing as a Stock Instead" );
			return false;
		}
		
		//looking for a SELLBOND request in the network to fulfill rather.
		let x, y, sellBlocks, bought = false;
		block = false;
		
		for( x = 0; x < blocks.length; x++ ){
			
			if( blocks[x].transType != "SELLBOND" ) continue;
			
			block = blocks[x];
			this.blockRef = block.blockRef;
			sellBlocks 		= await this.getTransBlock();
			
			if( sellBlocks && sellBlocks.length ) {
				for( y = 0; y < sellBlocks.length; y++ ) {
					if( sellBlocks[x].transType == "SOLDBOND" ){
						bought = true;
						break;
					}
				}
			}
			if( ! bought  ){
				//check the transaction value to be equal to the stock value.
				let transValue = block.agreement.value * value;
				
				if( block.transValue >= transValue  ){
					this.stockNoteAddress = block.blockKey;
					break;
				}								
			}
			
		}
		
		if( ! this.stockNoteAddress )
			this.stockNoteAddress = this.#currentNote.noteAddress;
		
		this.defaultBlock.transType = "BUYBOND";
		return this.invest( bondID, value );
	}
	
	static async sellScriptbillBonds( bondValue ){
		console.log("sellScriptbillBonds running " + this.funcUp );
		this.funcUp = "sellScriptbillBonds";
		
		//initializing storage.
		this.s			= await this.s;
		this.l			= await this.l;
		
		if( await this.s.currentNote )
			this.#note = await this.#getCurrentNote();
		
		if( ! this.#note || this.#note.noteType.lastIndexOf( "BND" ) != ( this.#note.noteType.length - 3 ) ) return false;
		
		if( this.#note.noteValue < bondValue ){
			console.error("Your Bond note Value is low Compare to What you Applied To Sell!");
			return false;
		}
		
		if( ! this.#note.budgetID ){
			console.error("Your Bond note doesn't Appear to Be Valid. No Exchange ID Stored on this Note. Please Contact Your Company For Rectification!");
			return false;
		}
		
		this.budgetID = this.#note.budgetID;
		let budgetBlocks  = await this.getTransBlock();
		
		if( ! budgetBlocks || ! budgetBlocks.length || ! budgetBlocks[0].agreement || ! budgetBlocks[0].agreement.value ){
			console.error("Your Bond note doesn't Appear to Be Valid. No Exchange Block Was Found Associated With The Exchange ID on this Note!");
			return false;
		}
		
		
		let x, budgetBlock = false, buyBlocks, y, sold = false;
		
		for( x = 0; x < budgetBlocks.length; x++ ){
			
			if( budgetBlocks[x].transType != "BUYBOND" ) continue;
			
			budgetBlock = budgetBlocks[x];
			this.blockRef = budgetBlock.blockRef;
			buyBlocks 		= await this.getTransBlock();
			
			if( buyBlocks && buyBlocks.length ) {
				for( y = 0; y < buyBlocks.length; y++ ) {
					if( buyBlocks[x].transType == "SOLDBOND" ){
						sold = true;
						break;
					}
				}
			}
			if( ! sold  ){
				//check the transaction value to be equal to the stock value.
				let transValue = budgetBlock.agreement.value * bondValue;
				
				if( budgetBlock.transValue >= transValue  ){					
					break;
				}
				else {
					budgetBlock = false;
				}
					
			}
				
		}
		
		if( ! budgetBlock || ( budgetBlock && sold ) ){
			this.details = budgetBlocks[0];
			this.details.recipient = this.#note.budgetID;
			this.details.transValue = budgetBlocks[0].agreement.value * stockValue;
			this.details.transType	= "SELLBOND";
		}
		else if( budgetBlock && ! sold ) {
			this.details = budgetBlock;
			this.details.recipient = budgetBlock.blockKey;
			this.details.transValue = budgetBlock.agreement.value * stockValue;
			this.details.transType	= "SOLDBOND";
		}
		
		this.isBudget 			= true;		
		this.details.stock		= this.#note.noteValue;
		this.details.pay 		= bondValue;		
		return await this.generateScriptbillTransactionBlock();	
	}
	/*
	*/
	static async monitorScriptbillBudget(){
		console.log("monitorScriptbillBudget running " + this.funcUp );
		this.funcUp = "monitorScriptbillBudget";
		
		//initializing storage.
		this.s 		= await this.s;
		this.l		= await this.l;
		
		if( await this.s.currentNote )
			this.#note = await this.#getCurrentNote();
		
		if( ! this.#note ) return;
		
		this.noteTypeS    	= this.#note.noteType;
		this.transType    	= "CREATEBUDGET";
		let budgetBlocks  	= await this.getTransBlock();
		this.noteTypeS	  	= this.#note.noteType;
		this.transType 	  	= "UPDATEBUDGET";
		let budgetBlocks2 	= await this.getTransBlock();
		budgetBlocks 		= this.compare( budgetBlocks2, budgetBlocks, "budgetID" );
		
		let x, budget, agreement, govBudget, budgetItems = {}, budgetValue = 0, govBlock;
		//the exec time can be manipulated using the budgetMin handler. The value should be in string.
		//indicating the time interval the budget should run
		let tenMins  = parseInt( this.calculateTime( this.budgetMin ? this.budgetMin : "10 minutes" ) );
		let execTime = await this.s.budgetRunned ? ( parseInt( await this.s.budgetRunned ) + tenMins) : 0;
		let currentTime = parseInt( await this.currentTime() );
		
		if( currentTime < execTime ){		
		
			//the note holds the governmental budget as a priority over other budgets.
			if( ! this.#note.budgetID )
				return false;
			
			this.budgetID 	= this.#note.budgetID;
			this.transType 	= "CREATEBUDGET";
			this.budgetBlock 	= await this.getTransBlock()[0];
			
			if( ! this.budgetBlock ) {
				this.budgetID 		= this.#note.budgetID;
				this.transType 		= "UPDATEBUDGET";
				this.budgetBlock	= await this.getTransBlock()[0];
			}
			
			if( ! this.budgetBlock ) return false;
			
			let budget 			= this.budgetBlock.agreement;
			let currentTime 	= await this.currentTime();
			
			if( budget.budgetItems ){
				let x, item, itemTime;
				for( x = 0; x < budget.budgetItems.length; x++ ){
					item 		= budget.budgetItems[x];
					itemTime 	= item.time + this.calculateTime( item.execTime );
					if( currentTime <= itemTime ){
						//creating a send transaction to the item recipient.
						this.details = JSON.parse( JSON.stringify( this.defaultBlock ) );
						
						if( budget.budgetCredit != this.#note.noteType )
							this.details.transValue = item.itemValue * await this.getExchangeValue( budget.budgetCredit, this.#note.noteType )[0];
						
						else 
							this.details.transValue = item.itemValue;
						
						this.details.transType = "SEND";
						this.details.recipient = item.scriptbillAddress;
						
						//if the recipient is empty, we create a new Scriptbill note, where the recipient would 
						//recieve his funds.
						if( ! this.details.recipient || ( this.details.recipient == "SCRIPTBILLADVERTS" && item.itemName != "Scriptbill Adverts" ) ) {
							//first we save the current note so that the note variable won't be replaced by the 
							//recipient note we want to create.
							let note 		= JSON.parse( JSON.stringify( this.#note ) );
							//the recipient would only recieve his transaction in the budget credit value.
							this.defaultScriptbill.noteType 	= budget.budgetCredit;
							//to get the budget credit currency type we get the blocks connected to the budget 
							//credit. If found we get the currency type, if not found, then we classify the 
							//budget credit type as fiat.
							this.noteTypeS 			= budget.budgetCredit;
							let block 				= await this.getTransBlock()[0];
							
							if( block ){
								this.defaultScriptbill.creditType = block.creditType;
							}
							else {
								this.defaultScriptbill.creditType = "fiat";
							}
							this.createNewScriptbillWallet();
							//since no one is claiming the note, we save the note in the agreement handler.
							this.details.agreement 		= JSON.parse( JSON.stringify( this.defaultAgree ));
							this.details.agreement.claimNote = JSON.parse( JSON.stringify( this.#note ) );
							this.details.recipient 		= this.#note.noteAddress;
							
							//next is to securely store the key on the Scriptbank server
							let url 				= new URL( this.#default_scriptbill_server );
							let data 				= {
								privateKey 			: this.#note.noteSecret,
								blockID 			: this.#note.blockID,
								sender				: note.noteAddress,
								transTime			: this.newBlock.transTime
							};
							
							await this.secureSend( data );
							this.#note 		= note;
						}
						return await this.generateScriptbillTransactionBlock();
					}
				}
			}			
		
		} else if( budgetBlocks && budgetBlocks.length ){
			for( x = 0; x < budgetBlocks.length; x++ ){
				budget = budgetBlocks[x];
				agreement = budget.agreement;
				
				if( agreement.budgetType && agreement.budgetType == "governmental" ){
					govBudget 	= agreement;
					govBlock 	= budget;
				}
				else if( agreement.budgetItems && agreement.budgetType ){
					budgetItems[agreement.budgetID] = agreement;
					budgetValue += agreement.value;
					
					//next, checking the if the value of the current budget is equal to the items value.
					let item, itemID, value = 0;
					for( itemID in agreement.budgetItems ) {
						item = agreement.budgetItems[ itemID ];
						value += item.itemValue;
					}
					
					if( agreement.value && agreement.value != value ){
						agreement.value = value;
						this.details =  budget;
						this.details.transType = "UPDATEBUDGET";
						this.details.transValue = 0;
						this.details.agreement = agreement;
						this.details.recipient = agreement.budgetID;
						return await this.generateScriptbillTransactionBlock();
					}
				}
			}
		}
		
		if( govBudget && govBudget.value != budgetValue ){
			govBudget.value = budgetValue;
			govBudget.budgetItems = budgetItems;
			this.details = govBlock;
			this.details.transType = "UPDATEBUDGET";
			this.details.agreement = govBudget;
			this.details.recipient = govBudget.budgetID;
			return await this.generateScriptbillTransactionBlock();
		}
		
		this.s.budgetRunned = await this.currentTime();
	}
	
	static async secureSend( data ){
		console.log("secureSend running " + this.funcUp );
		this.funcUp = "secureSend";
		
		//initializing storage.
		this.s 			= await this.s;
		this.l			= await this.l;
		
		if( await this.s.currentNote )
			this.#note = await this.#getCurrentNote();
		
		if( ! this.#note )
			return false;
		
		let url	= new URL( this.#default_scriptbill_server );
		url.searchParams.set("getKEY", "");
		url.searchParams.set( "noteAddress", this.#note.noteAddress );
		
		try {
		fetch( url ).then( response =>{
			return response.text();
		}).then( async result =>{
			await this.setPrivateKey( this.#note.noteSecret );
			let privKey	= await this.#decrypt( result );
							
			if( privKey && privKey.length == 44 ){
				await this.setPrivateKey( privKey );
				data 	= await this.#encrypt( typeof data == "object" ? JSON.stringify( data ) : data );
			}
			
			url.search = "";
								
			fetch( url,  {
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				mode: 'no-cors', // no-cors, *cors, same-origin
				cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				credentials: 'same-origin', // include, *same-origin, omit
				headers: {
					'Content-Type': 'application/json'
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
				redirect: 'follow', // manual, *follow, error
				referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
				body: JSON.stringify({"secureData": data}) // body data type must match "Content-Type" header
			} ).then( resp =>{ return resp.json(); } ).then( ret =>{ this.s.secureResponse = JSON.stringify( ret ); } );
		}); 
		} catch( e ){
			console.log("couldn't send secured data: " + e );
		}
		
	}
	/*
		Monitoring Scriptbill Credit means Monitoring any transactions that are linked with the current node
		or any note whose block we have access to.
		This function should be runned in a mood where all blocks are accessed.
	*/
	static async monitorScriptbillCredit(){
		console.log("monitorScriptbillCredit running " + this.funcUp );
		this.funcUp = "monitorScriptbillCredit";
		
		//initializing storage.
		this.s 		= await this.s;
		this.l		= await this.l;
		
		if( await this.s.currentNote )
			this.#note = await this.#getCurrentNote();
		
		//
		if( ! this.#note || this.#note.noteValue > 0 || ! this.response ) return false;
		
		if( this.#note.noteValue < 0 ) {
			this.response = await this.getTransBlock();			
		}
		
		if( ! this.response || ! this.response.blockID || ! this.response.noteValue ) return false;
		
		//first we check the current note value of the block.
		let noteValue = this.response.noteValue;
		
		//calculating the note value entails checking the transaction type.
		let transType = this.response.transType;
		
		if( this.transSend.includes( transType ) ){
			noteValue 	+= this.response.transValue; 
		}
		else if( this.transRecieve.includes( transType ) ){
			noteValue  	-= this.response.transValue;
		}
		
		//non credit holders are not going to be monitored.
		if( noteValue >= 0 ) return false;
		
		//next we check the transaction type. if is related to recieving we take our interest rate.
		if( this.transRecieve.includes( transType ) ){			
			this.details 			= this.response;
			//the nonce parameter is used to caliberate the auto transactions in the scriptbill network.
			//the nonce is created using the block ID hashes. This means the value will be the same for
			//every node that create the nonce. Transactions with the latest transtime and the same nonce
			//will be honoured by the node using it.
			this.string 			= this.details.blockID;
			this.details.nonce		= await this.hashed();
			//the interest type are written on the transaction block of crediters
			if( this.response.interestType && this.response.interestType == 'PT' )
				this.details.transValue 	= this.response.transValue * this.response.interestRate;
			
			else {
				//check if the interest is due and ready to be paid.
				if( this.response.payTime <= await this.currentTime() ){
					this.response.interestRate = this.calculateInterestRate( this.response.interestType, this.response.interestRate );
					let amount = Math.abs( this.response.noteValue ) * this.response.interestRate;
					
					if( amount > this.response.transValue ){
						this.details.transValue = this.response.transValue;
						this.details.toPay		= amount - this.response.transValue;
					}
				}
			}
			
			//creating the nonce. Required for an automatically executed transaction.
			//since the nonce will be the same thing. If the concerned note get'this.s this block, it won't recieve such request again from 
			//the network
			this.string 			= this.block.blockID;
			this.details.nonce 		= await this.hashed();
			this.details.transType 	= "INTERESTPAY";
			this.details.recipient	= "SCRIPTBANK";
			return await this.generateScriptbillTransactionBlock();
		}
		
	}
	
	//this is a mining function that works with auto investment on Scriptbill Budget and 
	//the exchange market. The function monitors the demand supply to and from the exchange
	//market and monitor the consequences to decide whether to make a supply or create a demand
	//demand comes for the exchange market using stock market sale and supply when purchasing
	//stocks.
	static async monitorScriptbillExchanges(){
		console.log("monitorScriptbillExchanges running " + this.funcUp );
		this.funcUp = "monitorScriptbillExchanges";
		if( ! this.response || this.response.transType != "EXCHANGE" || ! this.#note.budgetID || this.#note.noteType != this.response.buyCredit || this.#note.noteType != this.response.sellCredit ) return;
		
		//if it is an exchange block we get the exchange market value.
		//getting the exchange market of the sell credit.
		let sellMarket, buyMarket;
		
		//the sell Market will be the response block.
		if( ! this.response.exchangeNote ) return;
		
		if( this.response.sellCredit == this.#note.noteType ) {
		
			sellMarket 	= JSON.parse( JSON.stringify( this.response.exchangeNote ) );
			sellMarket.noteAddress 		= this.response.exchangeNote.exchangeID;
			sellMarket.noteSecret 		= this.response.exchangeNote.exchangeKey;
		}
		else if( this.response.buyCredit == this.#note.noteType ){
			this.sellCredit 		= this.#note.noteType;
			this.transType			= "EXCHANGE";
			this.exchangeBlocks		= await this.getTransBlock();
			this.noRequest 			= true;
			let sellBlock 			= await this.getCurrentExchangeBlock();
			
			if( sellBlock && sellBlock.exchangeNote ){
				sellMarket 			= JSON.parse( JSON.stringify( sellBlock.exchangeNote ) );
				sellMarket.noteAddress 		= sellBlock.exchangeNote.exchangeID;
				sellMarket.noteSecret 		= sellBlock.exchangeNote.exchangeKey;
			}
		}
		
		//getting the exchange rate of the buycredit agains the sellcredit.
		//or how much sell credit can purchase buy credit
		let exRates 		= await this.getExchangeValue( this.response.sellCredit, this.response.buyCredit );
		
		//checking if the exchange rate favours the current budget value of the note'this.s budget.
		this.budgetID 		= this.#note.budgetID;
		this.transType 		= "CREATEBUDGET";
		let budgetBlock		= await this.getTransBlock()[0];
		
		if( ! budgetBlock ){
			this.budgetID 		= this.#note.budgetID;
			this.transType 		= "UPDATEBUDGET";
			budgetBlock		= await this.getTransBlock()[0];
			
			if( ! budgetBlock ) return;
		}
		
		let budget 		= JSON.parse( JSON.stringify( budgetBlock.agreement ) );
		let budgetItems = budget.budgetItems;
		let item, cred, lastCred = null, exValue, totalValue = 0, execs = [];
		
		for( x = 0; x < budgetItems.length; x++){
			item 		= budgetItems[0];
			cred 		= item.itemCredit;
			
			if( lastCred && lastCred != cred ){
				//getting the exchange value in respect to cred. Meaning how many cred
				//can purchase lastCred. The totalValue of the transaction, will be calculated
				//in cred value.
				exValue 	= await this.getExchangeValue( lastCred, cred )[1];
				totalValue 	+= item.itemValue;
				totalValue 	= totalValue * exValue;
				lastCred 	= cred;
			}
			else {
				totalValue 	+= item.itemValue;
				lastCred 	= cred;
			}
		}
		
		//checking if the budget has dropped or risen based on the total item value we've
		//just gotten by converting the total value to the note'this.s credit value.
		let budgetRate 		= await this.getExchangeValue( this.#note.noteType, lastCred )[0];
		let budgetValue 	= totalValue * budgetRate;
		
		//the auto investment would not run in this, because based on the note value.
		//and the budget value, the investment is okay.
		if( budget.value < budgetValue ){
			//we sell Scriptbill stocks to get more credit to the exchange market.
			//to sell scriptbill stocks we get all stocks connected to the exchange account.
			//for exchange market stocks, the blockSign is the hash of the exchange market
			//note address.			
			this.string 		= sellMarket.noteAddress;
			this.string 		= await this.hashed();
			this.blockSign		= await this.hashed();
			this.transType 		= "QUOTESTOCK";
			this.budgetID 		= this.#note.budgetID;
			
			//all existing stock blocks for the current budget will be returned. 
			let stockBlocks 	= await this.getTransBlock(), stockBlock, found = false;
			
			for( x = 0; x < stockBlocks.length; x++ ){
				
				stockBlock 		= stockBlocks[x];
				
				if( stockBlock && stockBlock.blockSign == this.blockSign ){
					found = true;
					break;
				}
			}
			
			//this means we have found a stock block connected to this particular budget.
			if( found ){
				//sell 50% of the budget stocks to raise credit for the exchange market.
				let note = this.#note;
				this.#note = JSON.parse( JSON.stringify( this.defaultScriptbill ));
				this.#note.noteType 	= stockBlock.noteType;
				//generating a new key for the stock note.
				this.#note.noteSecret	= await this.generateKey(50);
				await this.setPrivateKey( this.#note.noteSecret );
				this.#note.noteAddress 	= await this.getPublicKey();
				this.#note.noteValue 	= stockBlock.noteValue;
				this.#note.blockID 		= stockBlock.blockID;
				this.#note.budgetID 	= stockBlock.budgetID;
				this.#note.motherKey 	= sellMarket.noteAddress;
				await this.sellScriptbillStocks( 0.5 );
				this.#note				= note;
				await this.saveNote();
			}
		}
		else if( budget.value > budgetValue ) {
			let buyValue 	= budget.value - budgetValue;
			let note 		= JSON.parse( JSON.stringify( this.#note ) );
			this.#note 		= JSON.parse( JSON.stringify( sellMarket ) );
			this.buyScriptbillStocks( budget.budgetID, buyValue );
			this.#note 		= note;
			await this.saveNote();
		}
		
	}
	
	//this function will only run when the this.block handler is there. 
	//we will only check the block that has productsub as a transaction type.
	static async handleSubscriptions(){
		console.log("handleSubscriptions running " + this.funcUp );
		this.funcUp = "handleSubscriptions";
		if( ! this.block || ! this.block.blockID || this.block.transType != "PRODUCTSUB" || ! this.block.agreement || ! this.block.agreement.subUnit  ){
			return false;
		}
		
		//the subconfiguration is stored in the agreement handler of the block.
		let spread 	= this.block.agreement.subConfig.subSpread;
		let nextSub	= this.block.agreement.subConfig.nextSub;
		let time 	= await this.currentTime();
		
		if( nextSub <= time ){
			this.block.agreement.subConfig.nextSub = parseInt( time ) + parseInt( this.calculateTime( this.block.agreement.subConfig.subSpread ) );
			this.details 			= this.block;
			this.string 			= this.block.blockID;
			this.details.nonce		= await this.hashed();
			this.details.transValue = this.block.agreement.subConfig.value;
			this.details.recipient  = this.block.productID;
			this.details.transType 	= "PRODUCTSUB";
			
			//to make it easy for the recipient to recieve an auto generated transation we set the agreement into the block
			//ref handler. 
			await this.setPublicKey( this.block.agreement.agreeID );
			this.details.blockRef   = await this.#encrypt( JSON.stringify( this.block.agreement ) );
			this.autoExecute		= true;
			
			//configure a fake note to make the function use it as a current note.
			//saving the current note.
			let note 				= this.#note;
			this.#note 				= this.defaultScriptbill;
			this.#note.noteAddress 	= this.block.blockKey;
			this.#note.noteID		= this.block.noteID;
			this.#note.noteValue 	= this.block.noteValue;
			this.#note.blockID 		= this.block.blockID;
			this.#note.noteSecret	= "AUTOEXECUTE";
			this.#note.transValue 	= this.block.transValue;
			this.#note.transTime 	= this.block.transTime;
			return await this.generateScriptbillTransactionBlock();
			//after the block has been generated, we set and save the note.
			this.#note				= note;
			await this.saveNote();
		}
		
		//for the current note subscription.
		if( this.#note && this.#note.noteSubs && this.#note.noteSubs.length ){
			let x, sub;
			for( x = 0; x < this.#note.noteSubs.length; x++ ){
				sub 	= this.#note.noteSubs[x];
				
				if( sub.nextSub <= time ){
					sub.nextSub = parseInt( time ) + parseInt( this.calculateTime( sub.subSpread ) );
					this.details	= this.block;
					this.details.transValue = sub.value;
					this.details.recipient = sub.productID;
					return await this.generateScriptbillTransactionBlock();
				}
			}
		}
	}
}



