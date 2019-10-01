const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    autoplay: false,
	lrcType: 1,
	listFolded: false,
	listMaxHeight: 90,
    audio: [
      {
        name: 'The Road Less Wandered (SYML Rework)',
        artist: 'Aquilo / Syml',
        url: 'http://music.163.com/song/media/outer/url?id=1298660403.mp3',
        cover: 'http://p2.music.126.net/Dxek7QJCdbzna_gYkbja3w==/109951163439614186.jpg?param=130y130',
		lrc: '[00:00.00]"这世上肯定有某个角落，存在着能完全领会我想表达的意思的人。"——村上春树[03:35.00]'
      },
	  {
        name: 'you are not alone',
        artist: '梶浦由記',
        url: 'http://music.163.com/song/media/outer/url?id=31587132.mp3',
        cover: 'http://p1.music.126.net/rX_npcmVBSNl_RaPHKjzfA==/7726268209111868.jpg?param=130y130',
		lrc: '[00:00.00]You are not alone, only you are your world[02:27.00]'
      },
	  {
        name: '暖春将至（off vocal）',
        artist: 'MoreanP',
        url: 'http://music.163.com/song/media/outer/url?id=468160026.mp3',
        cover: 'http://p2.music.126.net/oIrr_CK7qxHtrQ3nrSMu2g==/109951162885906666.jpg?param=130y130',
		lrc: '[00:00.00]尝试寻找生活中每一天中美好的事[02:27.00]'
      }
    ]
});

