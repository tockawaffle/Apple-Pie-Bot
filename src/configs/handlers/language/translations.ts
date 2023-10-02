const translationsData: TranslationsExport = {
    supportedLanguages: ["en-US", "pt-BR", "epo"],
    translations: {
        avatar: {
            footerMentioned: {
                "en-US": "This is the avatar of {mention}.",
                "pt-BR": "Este é o avatar de {mention}.",
                epo: "Tio estas la avataro de {mention}.",
            },
            footerSelf: {
                "en-US": "What a beautiful avatar!",
                "pt-BR": "Que pfp linda!",
                epo: "Kia bela avataro!",
            },
            error: {
                "en-US":
                    "Something went wrong while trying to get the avatar: {error}",
                "pt-BR": "Algo deu errado ao tentar mostrar o avatar: {error}",
                epo: "Io malsukcesis dum provado preni la avataron: {error}",
            },
        },
        "music::play": {
            error: {
                "en-US":
                    "Something went wrong while trying to play the song: `{error}`",
                "pt-BR": "Algo deu errado ao tentar tocar a música: `{error}`",
                epo: "Io malsukcesis dum provado ludigi la muzikon: `{error}`",
            },
            notConnected: {
                "en-US": "You must be in a voice channel to play music.",
                "pt-BR":
                    "Você deve estar em um canal de voz para tocar música.",
                epo: "Vi devas esti en voĉa kanalo por ludigi muzikon.",
            },
            connectedOnAnotherChannel: {
                "en-US":
                    "I am connected on another channel, join me there or wait for the current playling to end.",
                "pt-BR":
                    "Estou conectado em outro canal, entre lá ou espere a música atual acabar.",
                epo: "Mi estas konektita al alia kanalo, aliĝu tien aŭ atendu la finon de la nun ludata muziko.",
            },
            playlistAdded: {
                "en-US":
                    "Playlist `{name}` with **{length}** songs added to the queue!",
                "pt-BR":
                    "Playlist `{name}` com **{length}** músicas adicionada à fila!",
                epo: "Listo `{name}` kun **{length}** kantoj aldonita al la vico!",
            },
        },
        "events::music": {
            trackAdded: {
                "en-US": "{track} was added to the queue, with {length} songs!",
                "pt-BR": "{track} foi adicionada à fila, com {length} músicas!",
                epo: "{track} estis aldonita al la vico, kun {length} kantoj!",
            },
            tracksAdded: {
                "en-US": "{length} songs were added to the queue!",
                "pt-BR": "{length} músicas foram adicionadas à fila!",
                epo: "{length} kantoj estis aldonitaj al la vico!",
            },
            playlistAdded: {
                "en-US":
                    "{name} playlist was added to the queue, with {length} songs!",
                "pt-BR":
                    "Playlist {name} foi adicionada à fila, com {length} músicas!",
                epo: "{name} listo estis aldonita al la vico, kun {length} kantoj!",
            },
        },
    },
};

export default translationsData;
