//Repeta créditos ctm - Dev Criss en la casa (codigo desarrollado por la asociación de ShadowzClub) Roba el bot y te jodes pinche inútil 🖕🏻 - Shadow Ultra && Sunflare Team && ShadowzClub

let handler = async (m, { conn, command }) => {
    if (!db.data.chats[m.chat].nsfw && m.isGroup) {
        return m.reply(hotw);
    }

    let who = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : null);
    let name = who ? "@" + who.split("@")[0] : '';
    let name2 = "@" + m.sender.split("@")[0];

    const configs = {
        violar: {
            react: '🥵',
            texts: {
mention: `${name2} *acabás de violar a la putita de* ${name} *mientras te decía "metemela durooo más durooo que rico pitote"...*\n*Tenemos que volver a sudar juntos!!.*`,
quoted: `${name2} *violaste a la zorra mal parida de* ${name} *mientras te decía "metemela durooo más durooo que rico pitote"...*\n*Tenemos que volver a sudar juntos!!.*`,
random: `*Violaste a alguien del grupo por puta*`
            },
            videos: [
'https://files.catbox.moe/cnmn0x.jpg',
'https://files.catbox.moe/xph5x5.mp4',
'https://files.catbox.moe/4ffxj8.mp4',
'https://files.catbox.moe/f6ovgb.mp4',
'https://qu.ax/XmLe.mp4',
'https://qu.ax/yiMt.mp4',
'https://qu.ax/cdKQ.mp4'
         ]
},
        anal: {
            react: '🍑',
            texts: {
mention: `${name2} *le partió el culo a la puta de* ${name}.`,
quoted: `${name2} *se la metió en el ano a* ${name}.`,
random: `*Hiciste un anal con alguien del grupo hasta cansarte*`
            },
            videos: [
'https://telegra.ph/file/7185b0be7a315706d086a.mp4',
'https://telegra.ph/file/a11625fef11d628d3c8df.mp4',
'https://telegra.ph/file/062b9506656e89b069618.mp4',
'https://telegra.ph/file/1325494a54adc9a87ec56.mp4',
'https://qu.ax/KKazS.mp4',
'https://qu.ax/ieJeB.mp4',
'https://qu.ax/MCdGn.mp4'
         ]
},
        cum: {
            react: '💦',
            texts: {
mention: `${name2} *se vino dentro de* ${name} *sin control alguno.*`,
quoted: `${name2} *se vino dentro de* ${name} *mientras todos miraban sorprendidos.*`,
random: `*Te viniste encima de alguien random del grupo...* *Omitiremos eso.*`
            },
            videos: [
'https://telegra.ph/file/9243544e7ab350ce747d7.mp4',
'https://telegra.ph/file/fadc180ae9c212e2bd3e1.mp4',
'https://telegra.ph/file/79a5a0042dd8c44754942.mp4',
'https://telegra.ph/file/035e84b8767a9f1ac070b.mp4',
'https://telegra.ph/file/0103144b636efcbdc069b.mp4',
'https://telegra.ph/file/4d97457142dff96a3f382.mp4',
'https://telegra.ph/file/b1b4c9f48eaae4a79ae0e.mp4',
'https://telegra.ph/file/5094ac53709aa11683a54.mp4',
'https://telegra.ph/file/5094ac53709aa11683a54.mp4',
'https://telegra.ph/file/dc279553e1ccfec6783f3.mp4',
'https://telegra.ph/file/acdb5c2703ee8390aaf33.mp4'
            ]
},
        fap: {
            react: '🍆',
            texts: {
mention: `${name2} *se pajea pensando en* ${name}.`,
quoted: `${name2} *está pajeando a* ${name}.`,
random: `*Te la jalaste con la foto de la primera persona que hable.*`
            },
            videos: [
'https://qu.ax/TFGZu.mp4',
'https://qu.ax/DFYTU.mp4',
'https://qu.ax/ugAfu.mp4',
'https://qu.ax/pbpcw.mp4',
'https://qu.ax/UrzOi.mp4',
'https://qu.ax/KaQp.mp4',
'https://qu.ax/fsWkl.mp4',
'https://qu.ax/nZMnv.mp4'
            ]
},
     follar: {
            react: '🔥',
            texts: {
mention: `${name2} *folló fuertemente a la perra de* ${name}.`,
quoted: `${name2} *se la metió durísimo a la perrita de* ${name}.`,
random: `${name2} *está follando ricamente a alguien del grupo.*`
            },
            videos: [
'https://files.catbox.moe/7ito13.mp4',
'https://files.catbox.moe/6to3zj.mp4',
'https://files.catbox.moe/8j94sh.mp4',
'https://files.catbox.moe/ylfpb7.mp4',
'https://files.catbox.moe/kccjc7.mp4',
'https://files.catbox.moe/lt9e1u.mp4'
            ]
},
        footjob: {
            react: '👣',
            texts: {
mention: `${name2} le hizo una paja con los pies a ${name}.`,
quoted: `${name2} le hizo una paja con los pies a ${name}.`,
random: `${name2} está haciendo una paja con los pies!`
            },
            videos: [
'https://qu.ax/aTGxj.mp4',
'https://qu.ax/SCxhs.mp4',
'https://qu.ax/ASKQT.mp4',
'https://qu.ax/UQzPO.mp4',
'https://qu.ax/yexqZ.mp4',
'https://qu.ax/Agxmr.mp4',
'https://qu.ax/dvgDr.mp4'
            ]
}, //BY BENJA
        fuck: {
            react: '🥵',
            texts: {
mention:`${name2} *se la metió sabrosamente a* ${name}`, 
quoted: `${name2} *cogió fuertemente a* ${name}`,
random: `*Estás cogiendo a alguien random del grupo!*`
            },
            videos: [
'https://telegra.ph/file/6ea4ddf2f9f4176d4a5c0.mp4', 
'https://telegra.ph/file/66535b909845bd2ffbad9.mp4', 
'https://telegra.ph/file/1af11cf4ffeda3386324b.mp4', 
'https://telegra.ph/file/1af11cf4ffeda3386324b.mp4', 
'https://telegra.ph/file/21543bac2383ce0fc6f51.mp4', 
'https://telegra.ph/file/1baf2e8577d5118c03438.mp4', 
'https://telegra.ph/file/80aa0e43656667b07d0b4.mp4', 
'https://telegra.ph/file/7638618cf43e499007765.mp4', 
'https://telegra.ph/file/1c7d59e637f8e5915dbbc.mp4', 
'https://telegra.ph/file/e7078700d16baad953348.mp4', 
'https://telegra.ph/file/100ba1caee241e5c439de.mp4', 
'https://telegra.ph/file/3b1d6ef30a5e53518b13b.mp4', 
'https://telegra.ph/file/249518bf45c1050926d9c.mp4', 
'https://telegra.ph/file/34e1fb2f847cbb0ce0ea2.mp4', 
'https://telegra.ph/file/52c82a0269bb69d5c9fc4.mp4', 
'https://telegra.ph/file/ca64bfe2eb8f7f8c6b12c.mp4', 
'https://telegra.ph/file/8e94da8d393a6c634f6f9.mp4', 
'https://telegra.ph/file/216b3ab73e1d98d698843.mp4', 
'https://telegra.ph/file/1dec277caf371c8473c08.mp4', 
'https://telegra.ph/file/bbf6323509d48f4a76c13.mp4', 
'https://telegra.ph/file/f8e4abb6923b95e924724.mp4', 
'https://telegra.ph/file/bd4d5a957466eee06a208.mp4', 
'https://telegra.ph/file/a91d94a51dba34dc1bed9.mp4', 
'https://telegra.ph/file/b08996c47ff1b38e13df0.mp4',
'https://telegra.ph/file/58bcc3cd79cecda3acdfa.mp4'
         ]
},
        fuck2: {
            react: '🏳️‍🌈',
            texts: {
mention: `${name2} *se lo metió ricamente a* ${name}`,
quoted: `${name2} *cojió salvajemente a* ${name}`,
random: `*Estás cojiendo al gay del grupo.*`
            },
            videos: [
'https://qu.ax/bhUEf.mp4',
'https://qu.ax/wVHWY.mp4',
'https://qu.ax/iQHXq.mp4',
'https://qu.ax/nfhKg.mp4',
'https://qu.ax/PlPj.mp4',
'https://qu.ax/DEE.mp4',
'https://qu.ax/Dtwk.mp4',
'https://qu.ax/qDZdo.mp4',
'https://qu.ax/ADrNd.mp4',
'https://qu.ax/nRgKj.mp4',
'https://qu.ax/UdtlE.mp4',
'https://qu.ax/UUCPt.mp4',
'https://qu.ax/AvVl.mp4',
'https://qu.ax/BbNEM.mp4'
         ]
},
        lickpussy: {
            react: '🤪',
            texts: {
mention: `${name2} *le está lamiendo el coño a* ${name}`,
quoted: `${name2} *le chupó el coño a* ${name}`,
random: `*Estás lamiendo un coño >.<*`,
            },
            videos: [
'https://qu.ax/LPcsZ.mp4',
'https://qu.ax/OvlTU.mp4',
'https://qu.ax/gaZHP.mp4',
'https://qu.ax/PSBkz.mp4',
'https://qu.ax/Kejmn.mp4',
'https://qu.ax/SFFq.mp4',
'https://qu.ax/EDZBg.mp4',
'https://qu.ax/Smfz.mp4'
         ]
},
        grabboobs: {
            react: '🔥',
            texts: {
mention: `${name2} *le está agarrando las tetas a* ${name}`,
quoted: `${name2} *está agarrando las tetas de* ${name}.`,
random: `*Estás agarrando las tetas de la chichona del grupo 🥵*`,
            },
            videos: [
'https://telegra.ph/file/e6bf14b93dfe22c4972d0.mp4',
'https://telegra.ph/file/075db3ebba7126d2f0d95.mp4',
'https://telegra.ph/file/37c21753892b5d843b9ce.mp4',
'https://telegra.ph/file/04bbf490e29158f03e348.mp4',
'https://telegra.ph/file/82d32821f3b57b62359f2.mp4',
'https://telegra.ph/file/61d85d10baf2e3b9a4cde.mp4',
'https://telegra.ph/file/538c95e4f1c481bcc3cce.mp4',
'https://telegra.ph/file/e999ef6e67a1a75a515d6.mp4',
'https://telegra.ph/file/05c1bd3a2ec54428ac2fc.mp4'
         ]
},
        mamada: {
            react: '😮',
            texts: {
mention: `${name2} *le dió una rica mamada a* ${name}`, 
quoted: `${name2} *le está dando una mamada a* ${name}`,
random: `*Estas dando una rica mamada*.`,
            },
            videos: [
'https://telegra.ph/file/0260766c6b36537aa2802.mp4',
'https://telegra.ph/file/2c1c68c9e310f60f1ded1.mp4',
'https://telegra.ph/file/e14f5a31d3b3c279f5593.mp4',
'https://telegra.ph/file/e020aa808f154a30b8da7.mp4',
'https://telegra.ph/file/1cafb3e72664af94d45c0.mp4',
'https://telegra.ph/file/72b49d3b554df64e377bb.mp4',
'https://telegra.ph/file/9687aedfd58a3110c7f88.mp4',
'https://telegra.ph/file/c799ea8a1ed0fd336579c.mp4',
'https://telegra.ph/file/7352d18934971201deed5.mp4',
'https://telegra.ph/file/379edd38bac6de4258843.mp4'
         ]
},
        manosear: {
            react: '😏',
            texts: {
mention: `${name2} *le está manoseando a* ${name}`,
quoted: `${name2} *está manoseando a* ${name}`,
random: `*Estás manoseando a alguien del grupo!*.`,
            },
            videos: [
'https://qu.ax/RdBAy.mp4',
'https://qu.ax/DolnW.mp4',
'https://qu.ax/OydCh.mp4', 
'https://qu.ax/CDrZm.mp4',
'https://qu.ax/BRmBk.mp4',
'https://qu.ax/AFzqg.mp4'
         ]
},
        rusa: {
            react:'🥵', 
            texts: {
mention: `${name2} *le hizo una rusa a* ${name}.`,
quoted: `${name2} *está haciendo una rusa a* ${name}.`,
random: `*Estás haciendo una rusa a un random del grupo.*`,
            },
            videos: [
'https://telegra.ph/file/e4412c087db1b1a7a4022.mp4', 
'https://telegra.ph/file/7e6bd15e33a1d77d6fb15.mp4', 
'https://telegra.ph/file/de3cbbb4611242eb0648c.mp4', 
'https://telegra.ph/file/4ca2676e76364d6861852.mp4', 
'https://telegra.ph/file/1099709e53a16a8a791fd.mp4',
'https://telegra.ph/file/3baffe20cdfbb03d31e45.mp4',
'https://telegra.ph/file/7cc41bab371611124693e.mp4',
'https://telegra.ph/file/adaefc5b25537d948b959.mp4'
         ]
},
        sex: {
            react: '🥵',
            texts: {
mention:`${name2} *tiene sexo fuertemente con* ${name}.`,
quoted: `${name2} *tiene sexo con* ${name}.`,
random: `*Estás teniendo sexo apasionadamente.*`,
            },
            videos: [
'https://telegra.ph/file/a2ad1dd463a935d5dfd17.mp4',
'https://telegra.ph/file/e3abb2e79cd1ccf709e91.mp4',
'https://telegra.ph/file/c5be4a906531c6731cd41.mp4',
'https://telegra.ph/file/9c4b894e034c290df75e4.mp4',
'https://telegra.ph/file/3246f62c61a0ebebcb5c8.mp4',
'https://telegra.ph/file/820460f05d76bb2329bbc.mp4',
'https://telegra.ph/file/2072f260302c6bb97682a.mp4',
'https://telegra.ph/file/22d0ef801c93c1b2ac074.mp4',
'https://telegra.ph/file/6f66fd1974e8df1496768.mp4'
         ]
},
        sixnine: {
            react: '🥵', 
            texts: {
mention: `${name2} *está haciendo un 69 con* ${name}.`,
quoted: `${name2} *hizo un 69 con* ${name}.`,
random: `*Estás haciendo un 69 con alguien del grupo! >.<*`,
            },
            videos: [
'https://telegra.ph/file/bb4341187c893748f912b.mp4',
'https://telegra.ph/file/c7f154b0ce694449a53cc.mp4',
'https://telegra.ph/file/1101c595689f638881327.mp4',
'https://telegra.ph/file/f7f2a23e9c45a5d6bf2a1.mp4',
'https://telegra.ph/file/a2098292896fb05675250.mp4',
'https://telegra.ph/file/16f43effd7357e82c94d3.mp4',
'https://telegra.ph/file/1cbaa4a7a61f1ad18af01.mp4',
'https://telegra.ph/file/1083c19087f6997ec8095.mp4'
         ]
},
        suckboobs: {
            react: '🔥',
            texts: {
mention: `${name2} *le chupó las tetas a* ${name}.`,
quoted: `${name2} *le está chupando las tetas a* ${name}.`,
random: `*Le estás chupando las tetas a la más chichona del grupo.*`,
            },
            videos: [
'https://telegra.ph/file/01143878beb3d0430c33e.mp4',
'https://telegra.ph/file/7b181cbaa54eee6c048fc.mp4',
'https://telegra.ph/file/f8cf75586670483fadc1d.mp4',
'https://telegra.ph/file/f8969e557ad07e7e53f1a.mp4',
'https://telegra.ph/file/1104aa065e51d29a5fb4f.mp4',
'https://telegra.ph/file/9e1240c29f3a6a9867aaa.mp4',
'https://telegra.ph/file/949dff632250307033b2e.mp4',
'https://telegra.ph/file/b178b294a963d562bb449.mp4',
'https://telegra.ph/file/95efbd8837aa18f3e2bde.mp4',
'https://telegra.ph/file/9827c7270c9ceddb8d074.mp4'
         ]
},
        yuri: {
            react: '✂️',
            texts: {
mention: `${name2} *hizo tijeras con* ${name}.`,
quoted:`${name2} *está haciendo tijeras con* ${name}.`,
random: `*Estás haciendo tijeras con una amiga del grupo.*`
            },
            videos: [
'https://telegra.ph/file/d11af77009e15383a5f3e.mp4',
'https://telegra.ph/file/b24f36949398986232952.mp4',
'https://telegra.ph/file/aae61f727baf48c0a25f8.mp4',
'https://telegra.ph/file/8baea377988065dd28520.mp4',
'https://telegra.ph/file/553649d8f95f7ff86b9f2.mp4',
'https://telegra.ph/file/c3b386d99c84e7c914a6e.mp4',
'https://telegra.ph/file/a438a1aec11241b8a63eb.mp4',
'https://telegra.ph/file/0c5a22faacbc91d4e93a5.mp4'
         ]
}
};

   let key;
    switch (command) {
        case 'violar':
            key = 'violar';
            break;
        case 'anal':
        case 'culiar':
            key = 'anal';
            break;
        case 'cum':
        case 'leche':
            key = 'cum';
            break;
        case 'fap':
        case 'paja':
            key = 'fap';
            break;
        case 'follar':
            key = 'follar';
            break;
        case 'footjob':
        case 'pies':
            key = 'footjob';
            break;
        case 'fuck': 
        case 'coger':
            key = 'fuck';
            break;
        case 'fuck2':
        case 'coger2':
            key = 'fuck2';
            break;
        case 'grabboobs':
        case 'agarrartetas':
            key = 'grabboobs';
            break;
        case 'lickpussy':
        case 'coño':
            key = 'lickpussy';
            break;
        case 'mamada':
        case 'bj':
        case 'blowjob':
            key = 'mamada';
            break;
        case 'manosear':
        case 'grop':
            key = 'manosear';
            break;
        case 'rusa':
        case 'boobjob':
            key = 'rusa';
            break;
        case 'sex':
        case 'sexo':
            key = 'sex';
            break;
        case 'sixnine':
        case '69':
            key = 'sixnine';
            break;
        case 'suckboobs':
        case 'chupartetas':
            key = 'suckboobs';
            break;
        case 'yuri':
        case 'tijeras':
            key = 'yuri';
            break;
        default:
            return;
    }

    let cfg = configs[key];
    m.react(cfg.react);

    let str = m.mentionedJid.length > 0
        ? cfg.texts.mention
        : m.quoted
        ? cfg.texts.quoted
        : cfg.texts.random;

    let video = cfg.videos[Math.floor(Math.random() * cfg.videos.length)];

    let mentions = [m.sender];
    if (who) mentions.push(who);

    conn.sendMessage(
        m.chat,
        { video: { url: video }, gifPlayback: true, caption: str, mentions },
        { quoted: m }
    );
};

handler.help = ['violar', 'anal', 'culiar', 'cum', 'leche', 'fap', 'paja', 'follar', 'footjob', 'pies', 'fuck', 'coger', 'fuck2', 'coger2', 'grabboobs', 'agarrartetas', 'lickpussy', 'coño', 'blowjob', 'bj', 'mamada', 'grop', 'manosear', 'boobjob', 'rusa', 'sexo', 'sex', 'sixnine', '69', 'suckboobs', 'chupartetas', 'yuri', 'tijeras'];
handler.tags = ['emox'];
handler.command = handler.help
handler.group = true;

export default handler;
