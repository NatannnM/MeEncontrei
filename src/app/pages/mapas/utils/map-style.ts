export const cleanMapStyle: google.maps.MapTypeStyle[] = [
	{ elementType: "labels", stylers: [{ visibility: "off" }] },
	{ featureType: "administrative", elementType: "geometry", stylers: [{ visibility: "off" }] },
	{ featureType: "administrative.neighborhood", stylers: [{ visibility: "off" }] },
	{ featureType: "poi", stylers: [{ visibility: "off" }] },
	{ featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
	{ featureType: "road.arterial", elementType: "labels", stylers: [{ visibility: "off" }] },
	{ featureType: "road.highway", elementType: "labels", stylers: [{ visibility: "off" }] },
	{ featureType: "road.local", stylers: [{ visibility: "off" }] },
	{ featureType: "transit", stylers: [{ visibility: "off" }] },
];

export const iconColors: string[] = ["#BFFF00", "#0078FF", "#FF4B4B", "#28A745", "#FFC107", "#9C27B0"];

const esucri6 =
{
	name: "6",
	shapes: {
		markers: [
			{ position: { lat: -28.68146542381078, lng: -49.373570927768434 }, centered: false, zoom: 20, name: "Elevador", icon: 3, description: "" },
			{ position: { lat: -28.68151117685074, lng: -49.37363097116916 }, centered: false, zoom: 20, name: "Banheiro", icon: 1, description: "" },
			{ position: { lat: -28.681601477211206, lng: -49.37361387208669 }, centered: false, zoom: 20, name: "Sala de aula", icon: 2, description: "" },
			{ position: { lat: -28.68155559169575, lng: -49.37352804139822 }, centered: false, zoom: 20, name: "Laboratório", icon: 2, description: "" }
		],
		circles: [],
		rectangles: [],
		polygons: [
			{
				path: [
					{ lat: -28.68141829798073, lng: -49.373572262166846 },
					{ lat: -28.681554022601247, lng: -49.373700391379906 },
					{ lat: -28.681665500839546, lng: -49.37359769261805 },
					{ lat: -28.681665206701872, lng: -49.37354951693051 },
					{ lat: -28.681554369570655, lng: -49.37344357956065 }
				],
				fillColor: "#b3b3b3ff",
				fillOpacity: 1,
				strokeColor: "#b3b3b3ff",
				strokeOpacity: 1,
				strokeWeight: 3
			}
		],
		polylines: [
			{ path: [{ lat: -28.681554257510133, lng: -49.37370135702057 }, { lat: -28.68141836567162, lng: -49.3735719404356 }, { lat: -28.68155461533414, lng: -49.373443901064036 }, { lat: -28.681665235714334, lng: -49.37354926542059 }, { lat: -28.681665235714334, lng: -49.37359788045899 }, { lat: -28.681554257510133, lng: -49.37370135702057 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.68151882917243, lng: -49.373667680363546 }, { lat: -28.681555008150923, lng: -49.37363515857924 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.68153471262794, lng: -49.37364890490044 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.681527947452743, lng: -49.37364253465403 }, { lat: -28.681522064691347, lng: -49.373637170236 }, { lat: -28.681537948146357, lng: -49.37362308863867 }, { lat: -28.68149667691086, lng: -49.373583214748 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.681499030016038, lng: -49.373585226404764 }, { lat: -28.681465792400594, lng: -49.373617077636816 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.681484323107856, lng: -49.37363451199541 }, { lat: -28.681489617595037, lng: -49.37362948285351 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.681495794496367, lng: -49.373623447883226 }, { lat: -28.681507265883713, lng: -49.37361238377104 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.68149785346344, lng: -49.37362110095034 }, { lat: -28.68147991103496, lng: -49.37360400186787 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.681465135497724, lng: -49.373528409676624 }, { lat: -28.681513080019563, lng: -49.373573001401496 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.681567201416613, lng: -49.373623292820525 }, { lat: -28.681520727609975, lng: -49.37358004220016 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.681563083485216, lng: -49.373626645581794 }, { lat: -28.68156690727866, lng: -49.373623292820525 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.68155631831184, lng: -49.37361289926059 }, { lat: -28.681645277871397, lng: -49.373530466584846 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.68144995421943, lng: -49.373601831388434 }, { lat: -28.681482603563495, lng: -49.37357132126089 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.681480250457966, lng: -49.37356796849962 }, { lat: -28.681489368741637, lng: -49.37357635040279 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.68146559880667, lng: -49.37358736149695 }, { lat: -28.681448832925835, lng: -49.37357160351899 }, { lat: -28.681466187083146, lng: -49.37355483971265 }, { lat: -28.681470305018344, lng: -49.37355886302617 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.681517074690053, lng: -49.37360347166946 }, { lat: -28.681515603999596, lng: -49.37360481277397 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 }
		]
	}
}

const esucri5 =
{
	name: "5",
	shapes: {
		markers: [
			{
				position: { lat: -28.68146542381078, lng: -49.373570927768434 },
				centered: false,
				zoom: 20,
				name: "Elevador",
				icon: 3,
				description: ""
			},
			{
				position: { lat: -28.681504999950278, lng: -49.37363700613945 },
				centered: false,
				zoom: 20,
				name: "Banheiro",
				icon: 1,
				description: ""
			},
			{
				position: { lat: -28.681577357904306, lng: -49.37355016962259 },
				centered: false,
				zoom: 20,
				name: "Auditório",
				icon: 2,
				description: ""
			}
		],
		circles: [],
		rectangles: [],
		polygons: [
			{
				path: [
					{ lat: -28.68141829798073, lng: -49.373572262166846 },
					{ lat: -28.681554022601247, lng: -49.373700391379906 },
					{ lat: -28.681665500839546, lng: -49.37359769261805 },
					{ lat: -28.681665206701872, lng: -49.37354951693051 },
					{ lat: -28.681554369570655, lng: -49.37344357956065 }
				],
				fillColor: "#b3b3b3ff",
				fillOpacity: 1,
				strokeColor: "#b3b3b3ff",
				strokeOpacity: 1,
				strokeWeight: 3
			}
		],
		polylines: [
			{
				path: [
					{ lat: -28.681554257510133, lng: -49.37370135702057 },
					{ lat: -28.68141836567162, lng: -49.3735719404356 },
					{ lat: -28.68155461533414, lng: -49.373443901064036 },
					{ lat: -28.681665235714334, lng: -49.37354926542059 },
					{ lat: -28.681665235714334, lng: -49.37359788045899 },
					{ lat: -28.681554257510133, lng: -49.37370135702057 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.68151882917243, lng: -49.373667680363546 },
					{ lat: -28.681555008150923, lng: -49.37363515857924 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [{ lat: -28.68153471262794, lng: -49.37364890490044 }],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.68149873587789, lng: -49.37358556168089 },
					{ lat: -28.681465792400594, lng: -49.373617077636816 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.68146524940891, lng: -49.373586743962726 },
					{ lat: -28.68148172114893, lng: -49.37357098598476 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681477603214162, lng: -49.37356595684286 },
					{ lat: -28.681482015287127, lng: -49.37357031543251 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681465304668425, lng: -49.37358736149695 },
					{ lat: -28.681448832925835, lng: -49.37357160351899 },
					{ lat: -28.681466187083146, lng: -49.37355483971265 },
					{ lat: -28.681470305018344, lng: -49.37355886302617 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681517074690053, lng: -49.37360347166946 },
					{ lat: -28.681515603999596, lng: -49.37360481277397 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681464683203266, lng: -49.373528549777696 },
					{ lat: -28.681566454984637, lng: -49.37362410347385 },
					{ lat: -28.681562925329136, lng: -49.37362745623512 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681473290302197, lng: -49.37360968113511 },
					{ lat: -28.681492115146277, lng: -49.373627115493704 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681482408586465, lng: -49.37360096395581 },
					{ lat: -28.68152182309645, lng: -49.373638850158144 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681490350317283, lng: -49.37359425843327 },
					{ lat: -28.68150946929641, lng: -49.373611022239615 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681511822401283, lng: -49.37360867530673 },
					{ lat: -28.68150711619148, lng: -49.373613033896376 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [{ lat: -28.681498586185633, lng: -49.37362108052342 }],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.68150351055667, lng: -49.37361594302939 },
					{ lat: -28.6814982160702, lng: -49.373620972171295 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.68148939192546, lng: -49.37362935407447 },
					{ lat: -28.681495568826858, lng: -49.37362398965644 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [{ lat: -28.681457036721778, lng: -49.37362935407447 }],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [{ lat: -28.681467919836855, lng: -49.37364108873891 }],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681486156405555, lng: -49.37363237155961 },
					{ lat: -28.68148409743828, lng: -49.3736347184925 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681505275385447, lng: -49.37365483506011 },
					{ lat: -28.68151292297642, lng: -49.37364745898532 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681529461593353, lng: -49.37363252403733 },
					{ lat: -28.681520343313185, lng: -49.37364023538825 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681498282954628, lng: -49.37358558537957 },
					{ lat: -28.681538579872736, lng: -49.373622801029654 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [{ lat: -28.681550639531352, lng: -49.37362246575353 }],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [{ lat: -28.681542109529065, lng: -49.373630177104445 }],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681538579872736, lng: -49.373622801029654 },
					{ lat: -28.68153563849238, lng: -49.37362548323867 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			}
		]
	}
}

const esucri4 =
{
	name: "4",
	shapes: {
		markers: [
			{ position: { lat: -28.68146542381078, lng: -49.373570927768434 }, centered: false, zoom: 20, name: "Elevador", icon: 3, description: "" },
			{ position: { lat: -28.68151117685074, lng: -49.37363097116916 }, centered: false, zoom: 20, name: "Banheiro", icon: 1, description: "" },
			{ position: { lat: -28.681601477211206, lng: -49.37361387208669 }, centered: false, zoom: 20, name: "Sala de aula", icon: 2, description: "" },
			{ position: { lat: -28.681575298938824, lng: -49.37355084017484 }, centered: false, zoom: 20, name: "Sala de aula", icon: 2, description: "" },
			{ position: { lat: -28.681530001688, lng: -49.37350507498353 }, centered: false, zoom: 20, name: "Sala de aula", icon: 2, description: "" }
		],
		circles: [],
		rectangles: [],
		polygons: [
			{
				path: [
					{ lat: -28.68141829798073, lng: -49.373572262166846 },
					{ lat: -28.681554022601247, lng: -49.373700391379906 },
					{ lat: -28.681665500839546, lng: -49.37359769261805 },
					{ lat: -28.681665206701872, lng: -49.37354951693051 },
					{ lat: -28.681554369570655, lng: -49.37344357956065 }
				],
				fillColor: "#b3b3b3ff",
				fillOpacity: 1,
				strokeColor: "#b3b3b3ff",
				strokeOpacity: 1,
				strokeWeight: 3
			}
		],
		polylines: [
			{ path: [{ lat: -28.681554257510133, lng: -49.37370135702057 }, { lat: -28.68141836567162, lng: -49.3735719404356 }, { lat: -28.68155461533414, lng: -49.373443901064036 }, { lat: -28.681665235714334, lng: -49.37354926542059 }, { lat: -28.681665235714334, lng: -49.37359788045899 }, { lat: -28.681554257510133, lng: -49.37370135702057 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.68151882917243, lng: -49.373667680363546 }, { lat: -28.681555008150923, lng: -49.37363515857924 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.68153471262794, lng: -49.37364890490044 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.681499030016038, lng: -49.373585226404764 }, { lat: -28.681465792400594, lng: -49.373617077636816 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.681484323107856, lng: -49.37363451199541 }, { lat: -28.681489617595037, lng: -49.37362948285351 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.681495794496367, lng: -49.373623447883226 }, { lat: -28.681507265883713, lng: -49.37361238377104 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.68149785346344, lng: -49.37362110095034 }, { lat: -28.68147991103496, lng: -49.37360400186787 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.681465135497724, lng: -49.373528409676624 }, { lat: -28.681499255527797, lng: -49.37355992563255 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.681567201416613, lng: -49.373623292820525 }, { lat: -28.68155455348394, lng: -49.37361222870834 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.681563083485216, lng: -49.373626645581794 }, { lat: -28.68156690727866, lng: -49.373623292820525 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.68155631831184, lng: -49.37361289926059 }, { lat: -28.681645277871397, lng: -49.373530466584846 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.68144995421943, lng: -49.373601831388434 }, { lat: -28.681482603563495, lng: -49.37357132126089 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.681480250457966, lng: -49.37356796849962 }, { lat: -28.681489368741637, lng: -49.37357635040279 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.68146559880667, lng: -49.37358736149695 }, { lat: -28.681448832925835, lng: -49.37357160351899 }, { lat: -28.681466187083146, lng: -49.37355483971265 }, { lat: -28.681470305018344, lng: -49.37355886302617 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.681517074690053, lng: -49.37360347166946 }, { lat: -28.681515603999596, lng: -49.37360481277397 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.681498801399215, lng: -49.37358546537265 }, { lat: -28.6815388041791, lng: -49.37362402212724 }, { lat: -28.681534686246575, lng: -49.373627710164634 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.681528509347498, lng: -49.37363340985879 }, { lat: -28.681518508652978, lng: -49.373641456485835 }, { lat: -28.681522920724206, lng: -49.37364514452323 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.681517037962518, lng: -49.37360323500737 }, { lat: -28.681514978995853, lng: -49.373605246664134 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.681530568313896, lng: -49.37365252059802 }, { lat: -28.681533215556346, lng: -49.37365453225478 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.68154543475807, lng: -49.373604414133474 }, { lat: -28.68150690267134, lng: -49.37356786903565 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.681509844052506, lng: -49.37357055124466 }, { lat: -28.68159896786268, lng: -49.37348639693682 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 }
		]
	}
}

const esucri3 =
{
	name: "4",
	shapes: {
		markers: [
			{
				position: {
					lat: -28.68146542381078,
					lng: -49.373570927768434
				},
				centered: false,
				zoom: 20,
				name: "Elevador",
				icon: 3,
				description: ""
			},
			{
				position: {
					lat: -28.68151117685074,
					lng: -49.37363097116916
				},
				centered: false,
				zoom: 20,
				name: "Banheiro",
				icon: 1,
				description: ""
			},
			{
				position: {
					lat: -28.681601477211206,
					lng: -49.37361387208669
				},
				centered: false,
				zoom: 20,
				name: "Sala de aula",
				icon: 2,
				description: ""
			},
			{
				position: {
					lat: -28.681575298938824,
					lng: -49.37355084017484
				},
				centered: false,
				zoom: 20,
				name: "Sala de aula",
				icon: 2,
				description: ""
			},
			{
				position: {
					lat: -28.681530001688,
					lng: -49.37350507498353
				},
				centered: false,
				zoom: 20,
				name: "Sala de aula",
				icon: 2,
				description: ""
			}
		],
		circles: [],
		rectangles: [],
		polygons: [
			{
				path: [
					{ lat: -28.68141829798073, lng: -49.373572262166846 },
					{ lat: -28.681554022601247, lng: -49.373700391379906 },
					{ lat: -28.681665500839546, lng: -49.37359769261805 },
					{ lat: -28.681665206701872, lng: -49.37354951693051 },
					{ lat: -28.681554369570655, lng: -49.37344357956065 }
				],
				fillColor: "#b3b3b3ff",
				fillOpacity: 1,
				strokeColor: "#b3b3b3ff",
				strokeOpacity: 1,
				strokeWeight: 3
			}
		],
		polylines: [
			{
				path: [
					{ lat: -28.681506018869033, lng: -49.373655088915065 },
					{ lat: -28.68141836567162, lng: -49.3735719404356 },
					{ lat: -28.68155461533414, lng: -49.373443901064036 },
					{ lat: -28.681665235714334, lng: -49.37354926542059 },
					{ lat: -28.681665235714334, lng: -49.37359788045899 },
					{ lat: -28.681554257510133, lng: -49.373703033401206 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.68151882917243, lng: -49.373667680363546 },
					{ lat: -28.681555008150923, lng: -49.37363515857924 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.68153471262794, lng: -49.37364890490044 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681499030016038, lng: -49.373585226404764 },
					{ lat: -28.681465792400594, lng: -49.373617077636816 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681484323107856, lng: -49.37363451199541 },
					{ lat: -28.681489617595037, lng: -49.37362948285351 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681495794496367, lng: -49.373623447883226 },
					{ lat: -28.681507265883713, lng: -49.37361238377104 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.68149785346344, lng: -49.37362110095034 },
					{ lat: -28.68147991103496, lng: -49.37360400186787 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681465135497724, lng: -49.373528409676624 },
					{ lat: -28.681499255527797, lng: -49.37355992563255 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681567201416613, lng: -49.373623292820525 },
					{ lat: -28.68155455348394, lng: -49.37361222870834 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681563083485216, lng: -49.373626645581794 },
					{ lat: -28.68156690727866, lng: -49.373623292820525 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.68155631831184, lng: -49.37361289926059 },
					{ lat: -28.681645277871397, lng: -49.373530466584846 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.68144995421943, lng: -49.373601831388434 },
					{ lat: -28.681482603563495, lng: -49.37357132126089 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681480250457966, lng: -49.37356796849962 },
					{ lat: -28.681489368741637, lng: -49.37357635040279 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.68146559880667, lng: -49.37358736149695 },
					{ lat: -28.681448832925835, lng: -49.37357160351899 },
					{ lat: -28.681466187083146, lng: -49.37355483971265 },
					{ lat: -28.681470305018344, lng: -49.37355886302617 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681517074690053, lng: -49.37360347166946 },
					{ lat: -28.681515603999596, lng: -49.37360481277397 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681517037962518, lng: -49.37360323500737 },
					{ lat: -28.681514978995853, lng: -49.373605246664134 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.68154543475807, lng: -49.373604414133474 },
					{ lat: -28.68150690267134, lng: -49.37356786903565 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681509844052506, lng: -49.37357055124466 },
					{ lat: -28.68159896786268, lng: -49.37348639693682 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681553638516437, lng: -49.373702824579205 },
					{ lat: -28.681518930227917, lng: -49.37366795586201 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.68149870903457, lng: -49.373585045022175 },
					{ lat: -28.681538123538417, lng: -49.373623601776764 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.68150606248791, lng: -49.37365478245656 },
					{ lat: -28.68152900525901, lng: -49.37363265423219 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681538417676457, lng: -49.37362326650064 },
					{ lat: -28.6815354762961, lng: -49.373625613433525 }
				],
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWeight: 3
			}
		]
	}
}

const esucri2 =
{
	name: 2,
	shapes: {
		markers: [
			{
				position: { lat: -28.68146542381078, lng: -49.373570927768434 },
				centered: false,
				zoom: 20,
				name: 'Elevador',
				icon: 3,
				description: ''
			},
			{
				position: { lat: -28.681500882016426, lng: -49.37362292454212 },
				centered: false,
				zoom: 20,
				name: 'Informática',
				icon: 4,
				description: ''
			},
			{
				position: { lat: -28.681601477211206, lng: -49.37361387208669 },
				centered: false,
				zoom: 20,
				name: 'Sala de aula',
				icon: 2,
				description: ''
			},
			{
				position: { lat: -28.68155559169575, lng: -49.37352804139822 },
				centered: false,
				zoom: 20,
				name: 'Laboratório',
				icon: 2,
				description: ''
			},
			{
				position: { lat: -28.681441742599564, lng: -49.373502887099775 },
				centered: false,
				zoom: 20,
				name: 'Sala de aula',
				icon: 2,
				description: ''
			}
		],
		circles: [],
		rectangles: [],
		polygons: [
			{
				path: [
					{ lat: -28.68141829798073, lng: -49.373572262166846 },
					{ lat: -28.681554022601247, lng: -49.373700391379906 },
					{ lat: -28.681665500839546, lng: -49.37359769261805 },
					{ lat: -28.681665206701872, lng: -49.37354951693051 },
					{ lat: -28.681554369570655, lng: -49.37344357956065 }
				],
				fillColor: '#b3b3b3ff',
				fillOpacity: 1,
				strokeColor: '#b3b3b3ff',
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681418796178935, lng: -49.37357175896664 },
					{ lat: -28.6813690867829, lng: -49.37352616141339 },
					{ lat: -28.68145296272136, lng: -49.37344659151584 },
					{ lat: -28.681554440376125, lng: -49.373444579859076 }
				],
				fillColor: '#b3b3b3ff',
				fillOpacity: 1,
				strokeColor: '#b3b3b3ff',
				strokeOpacity: 1,
				strokeWeight: 3
			}
		],
		polylines: [
			{
				path: [
					{ lat: -28.681554257510133, lng: -49.37370135702057 },
					{ lat: -28.68141836567162, lng: -49.3735719404356 },
					{ lat: -28.68155461533414, lng: -49.373443901064036 },
					{ lat: -28.681665235714334, lng: -49.37354926542059 },
					{ lat: -28.681665235714334, lng: -49.37359788045899 },
					{ lat: -28.681554257510133, lng: -49.37370135702057 }
				],
				strokeColor: 'black',
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.68151882917243, lng: -49.373667680363546 },
					{ lat: -28.681555008150923, lng: -49.37363515857924 }
				],
				strokeColor: 'black',
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [{ lat: -28.68153471262794, lng: -49.37364890490044 }],
				strokeColor: 'black',
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681499030016038, lng: -49.373585226404764 },
					{ lat: -28.681465792400594, lng: -49.373617077636816 }
				],
				strokeColor: 'black',
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681567201416613, lng: -49.373623292820525 },
					{ lat: -28.681521610024213, lng: -49.37357970692403 }
				],
				strokeColor: 'black',
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681563083485216, lng: -49.373626645581794 },
					{ lat: -28.68156690727866, lng: -49.373623292820525 }
				],
				strokeColor: 'black',
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.68155631831184, lng: -49.37361289926059 },
					{ lat: -28.681645277871397, lng: -49.373530466584846 }
				],
				strokeColor: 'black',
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.68144995421943, lng: -49.373601831388434 },
					{ lat: -28.681482603563495, lng: -49.37357132126089 }
				],
				strokeColor: 'black',
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681480250457966, lng: -49.37356796849962 },
					{ lat: -28.681489368741637, lng: -49.37357635040279 }
				],
				strokeColor: 'black',
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.68146559880667, lng: -49.37358736149695 },
					{ lat: -28.681448832925835, lng: -49.37357160351899 },
					{ lat: -28.681466187083146, lng: -49.37355483971265 },
					{ lat: -28.681470305018344, lng: -49.37355886302617 }
				],
				strokeColor: 'black',
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.68149894562965, lng: -49.3735852788208 },
					{ lat: -28.68154130151369, lng: -49.373622829747006 }
				],
				strokeColor: 'black',
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681555125999914, lng: -49.3736352349637 },
					{ lat: -28.681548949102044, lng: -49.3736302058218 }
				],
				strokeColor: 'black',
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681513989940278, lng: -49.373571536025274 },
					{ lat: -28.681465751280626, lng: -49.373527614852655 }
				],
				strokeColor: 'black',
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681554465827954, lng: -49.37344449691205 },
					{ lat: -28.681453511462905, lng: -49.3734468586601 },
					{ lat: -28.681369213836025, lng: -49.37352610683235 },
					{ lat: -28.68141862909362, lng: -49.373571704385604 }
				],
				strokeColor: 'black',
				strokeOpacity: 1,
				strokeWeight: 3
			}
		]
	}
}

const esucri1 =
{
	name: '1',
	shapes: {
		markers: [
			{
				position: { lat: -28.68146542381078, lng: -49.373570927768434 },
				centered: false,
				zoom: 20,
				name: "Elevador",
				icon: 1,
				description: ""
			},
			{
				position: { lat: -28.681442346419068, lng: -49.373473477988384 },
				centered: false,
				zoom: 20,
				name: "Lanchonete",
				icon: 5,
				description: ""
			},
			{
				position: { lat: -28.681528710494767, lng: -49.37360378522705 },
				centered: false,
				zoom: 20,
				name: "Banheiro",
				icon: 1,
				description: ""
			},
			{
				position: { lat: -28.681571654642656, lng: -49.37354175914358 },
				centered: false,
				zoom: 20,
				name: "Saguão",
				icon: 2,
				description: ""
			}
		],
		circles: [],
		rectangles: [],
		polygons: [
			{
				path: [
					{ lat: -28.681343952658263, lng: -49.373501447805666 },
					{ lat: -28.68146535164589, lng: -49.373618286489915 },
					{ lat: -28.68161628440142, lng: -49.3734860307634 },
					{ lat: -28.681615990263612, lng: -49.373477313584104 }
				],
				fillColor: "#b3b3b3ff",
				fillOpacity: 1,
				strokeColor: "#b3b3b3ff",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [{ lat: -28.681615753375247, lng: -49.37347808877786 }],
				fillColor: "#b3b3b3ff",
				fillOpacity: 1,
				strokeColor: "#b3b3b3ff",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.68134412677021, lng: -49.373501454536225 },
					{ lat: -28.681400307223527, lng: -49.37344881618431 },
					{ lat: -28.68149038818489, lng: -49.37344870709317 },
					{ lat: -28.681569204001903, lng: -49.37345424165356 },
					{ lat: -28.681607147790036, lng: -49.37346698214638 },
					{ lat: -28.681614795373576, lng: -49.373477375706315 }
				],
				fillColor: "#b3b3b3ff",
				fillOpacity: 1,
				strokeColor: "#b3b3b3ff",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681665993317953, lng: -49.37354959108147 },
					{ lat: -28.681553858832682, lng: -49.37370202154167 },
					{ lat: -28.68146586254633, lng: -49.37361824722816 },
					{ lat: -28.681616434563892, lng: -49.37348669620859 }
				],
				fillColor: "#b3b3b3ff",
				fillOpacity: 1,
				strokeColor: "#b3b3b3ff",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681666437980184, lng: -49.373607730890384 },
					{ lat: -28.681666143842516, lng: -49.373573616544476 },
					{ lat: -28.681666437980184, lng: -49.37354151385533 },
					{ lat: -28.681665849704842, lng: -49.37352458241092 },
					{ lat: -28.68165790798733, lng: -49.373517876888386 },
					{ lat: -28.681648201442883, lng: -49.37351821216451 },
					{ lat: -28.681634818175603, lng: -49.373504633481375 },
					{ lat: -28.681620552493193, lng: -49.37349139007436 },
					{ lat: -28.681632318004592, lng: -49.373576047296396 }
				],
				fillColor: "#b3b3b3ff",
				fillOpacity: 1,
				strokeColor: "#b3b3b3ff",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.68160922379128, lng: -49.37361316060576 },
					{ lat: -28.681656579971758, lng: -49.37361718391928 },
					{ lat: -28.68165937427988, lng: -49.37361383115801 },
					{ lat: -28.681653712129137, lng: -49.3736074609116 },
					{ lat: -28.681660992037177, lng: -49.37360008483681 },
					{ lat: -28.68165540342095, lng: -49.373591032381384 },
					{ lat: -28.68163893170824, lng: -49.37357024526152 }
				],
				fillColor: "#b3b3b3ff",
				fillOpacity: 1,
				strokeColor: "#b3b3b3ff",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.68159437269983, lng: -49.373638481692005 },
					{ lat: -28.681608050110132, lng: -49.37365239565127 },
					{ lat: -28.68161290338433, lng: -49.373655580774475 },
					{ lat: -28.681613344591064, lng: -49.37363764350169 },
					{ lat: -28.681606138214182, lng: -49.37362205316179 }
				],
				fillColor: "#b3b3b3ff",
				fillOpacity: 1,
				strokeColor: "#b3b3b3ff",
				strokeOpacity: 1,
				strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.68155319338923, lng: -49.37369044949167 },
					{ lat: -28.681562899942467, lng: -49.37370285470836 },
					{ lat: -28.681563782356356, lng: -49.37369346697681 },
					{ lat: -28.681592902010458, lng: -49.37366563905828 },
					{ lat: -28.68160290269786, lng: -49.37366429795377 },
					{ lat: -28.681605549938496, lng: -49.37366161574476 },
					{ lat: -28.681600549595043, lng: -49.37365792770736 },
					{ lat: -28.68162319820763, lng: -49.37363613475912 },
					{ lat: -28.68164437612668, lng: -49.373615515277315 },
					{ lat: -28.681644081988946, lng: -49.37361233015411 },
					{ lat: -28.68160702062771, lng: -49.37359623690002 }
				],
				fillColor: "#b3b3b3ff",
				fillOpacity: 1,
				strokeColor: "#b3b3b3ff",
				strokeOpacity: 1,
				strokeWeight: 3
			}
		],
		polylines: [
			{ path: [{ lat: -28.681468393071842, lng: -49.37355863644923 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.681463392721835, lng: -49.37352645211663 }, { lat: -28.681513102073097, lng: -49.37357339077439 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.681472216868745, lng: -49.37356132083382 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.68146192203061, lng: -49.37354958616938 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{ path: [{ lat: -28.681472511006962, lng: -49.373561991386076 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{
				path: [
					{ lat: -28.68147898204754, lng: -49.37356802635636 },
					{ lat: -28.68148427653499, lng: -49.37357238494601 },
					{ lat: -28.681465451689515, lng: -49.373588813476225 },
					{ lat: -28.681447215117217, lng: -49.373569702736994 },
					{ lat: -28.681465157551273, lng: -49.37355495058741 },
					{ lat: -28.68147045203942, lng: -49.37355930917706 }
				], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681450299085704, lng: -49.37353994501327 },
					{ lat: -28.681416179039694, lng: -49.37357179624532 },
					{ lat: -28.68155350732865, lng: -49.37370304709111 },
					{ lat: -28.681558507674364, lng: -49.37369768267308 },
					{ lat: -28.68156350801983, lng: -49.373703717643366 },
					{ lat: -28.681564390433707, lng: -49.37369399463569 },
					{ lat: -28.681592921811873, lng: -49.373666501993284 },
					{ lat: -28.681602922499298, lng: -49.373665496164904 }
				], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.68160338521125, lng: -49.37366508402838 },
					{ lat: -28.681606914865394, lng: -49.37366173126711 },
					{ lat: -28.68160162038414, lng: -49.37365770795359 },
					{ lat: -28.681608385554583, lng: -49.373652008259434 },
					{ lat: -28.681613680035504, lng: -49.37365636684908 }
				], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681613592705894, lng: -49.373656230660124 },
					{ lat: -28.681613298568085, lng: -49.37365153679435 },
					{ lat: -28.681613886843717, lng: -49.37364617237632 },
					{ lat: -28.681644771310307, lng: -49.37361633280103 }
				], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3
			},
			{ path: [{ lat: -28.681611533741126, lng: -49.37366662422006 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{
				path: [
					{ lat: -28.68164517286942, lng: -49.37361686797651 },
					{ lat: -28.681656644240352, lng: -49.37361753852876 }
				], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681656644240352, lng: -49.37361787380489 },
					{ lat: -28.681659879755003, lng: -49.37361351521524 },
					{ lat: -28.68165399700103, lng: -49.37360815079721 },
					{ lat: -28.681660173892702, lng: -49.37360278637918 },
					{ lat: -28.68166664492169, lng: -49.37360848607334 },
					{ lat: -28.68166664492169, lng: -49.373583005087696 }
				], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681666781957883, lng: -49.37354936311693 },
					{ lat: -28.681667076095557, lng: -49.373525223235795 },
					{ lat: -28.681658840240452, lng: -49.373517847161004 },
					{ lat: -28.681647957145202, lng: -49.37351751188488 },
					{ lat: -28.681616190266126, lng: -49.37348599592895 },
					{ lat: -28.681616778541745, lng: -49.3734766081974 }
				], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681616445205723, lng: -49.37347723406917 },
					{ lat: -28.681612621414086, lng: -49.373474551860156 },
					{ lat: -28.681607621070963, lng: -49.373466169956984 },
					{ lat: -28.68156761831736, lng: -49.37345376474029 },
					{ lat: -28.681490432663153, lng: -49.373448874071784 },
					{ lat: -28.681400675421944, lng: -49.37344856447771 },
					{ lat: -28.681343732808454, lng: -49.37350107554663 },
					{ lat: -28.681387265309095, lng: -49.37354365561474 }
				], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681377390800538, lng: -49.3735159751919 },
					{ lat: -28.681410040167226, lng: -49.37348613561661 }
				], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681418276041896, lng: -49.37347775371344 },
					{ lat: -28.681448572289593, lng: -49.373449255242654 }
				], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.6814200408721, lng: -49.373498205557176 },
					{ lat: -28.68142974743769, lng: -49.373506922736475 },
					{ lat: -28.681490339917687, lng: -49.37344891996653 }
				], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681541763263997, lng: -49.37369103149943 },
					{ lat: -28.681571471200105, lng: -49.37366253302865 },
					{ lat: -28.681555293612195, lng: -49.373646104498434 }
				], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681513820148112, lng: -49.37366487996154 },
					{ lat: -28.681547646024303, lng: -49.37363235817723 },
					{ lat: -28.681532939122953, lng: -49.37361760602765 }
				], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681544410506184, lng: -49.3736357109385 },
					{ lat: -28.681547646024303, lng: -49.37363872842364 }
				], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681560588095778, lng: -49.37367326186471 },
					{ lat: -28.68156264706155, lng: -49.37367527352147 }
				], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.68157264775186, lng: -49.37368533180528 },
					{ lat: -28.68156911809657, lng: -49.37368197904401 }
				], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.68146434155936, lng: -49.37361737607489 },
					{ lat: -28.681498167451537, lng: -49.373585860118965 },
					{ lat: -28.681512286081563, lng: -49.373598600611786 }
				], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681520227810108, lng: -49.37360597668658 },
					{ lat: -28.68152463988126, lng: -49.3736100000001 }
				], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681489049168633, lng: -49.37364084540377 },
					{ lat: -28.681522875052828, lng: -49.37360899417172 }
				], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.68148640192506, lng: -49.37361603497038 },
					{ lat: -28.681514933324472, lng: -49.37364386288891 }
				], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681497873313386, lng: -49.37360463558207 },
					{ lat: -28.681527875399997, lng: -49.37363212822447 }
				], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3
			},
			{ path: [{ lat: -28.68152728712388, lng: -49.3736324635006 }], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3 },
			{
				path: [
					{ lat: -28.68150375607611, lng: -49.3736549270011 },
					{ lat: -28.681506697457397, lng: -49.37365224479208 }
				], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681474342259058, lng: -49.37362776963482 },
					{ lat: -28.68147640122651, lng: -49.373625422701934 }
				], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.68148081329952, lng: -49.37362072883616 },
					{ lat: -28.681489049168633, lng: -49.37361402331362 }
				], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3
			},
			{
				path: [
					{ lat: -28.681493167102943, lng: -49.37360966472397 },
					{ lat: -28.681498461589683, lng: -49.37360463558207 }
				], strokeColor: "black", strokeOpacity: 1, strokeWeight: 3
			}
		]
	}
}

export const mapaEsucriShapes: object[] = [
	{ ...esucri1 }, { ...esucri2 }, { ...esucri3 }, { ...esucri4 }, { ...esucri5 }, { ...esucri6 },
]