import audioTrackAdd from "../../../events/player/audioTrackAdd";
import audioTracksAdd from "../../../events/player/audioTracksAdd";
import emptyChannel from "../../../events/player/emptyChannel";
import emptyQueue from "../../../events/player/emptyQueue";
import error from "../../../events/player/error";
import playerError from "../../../events/player/playerError";
import playerSkip from "../../../events/player/playerSkip";
import playerStart from "../../../events/player/playerStart";

export default [
    audioTrackAdd,
    audioTracksAdd,
    emptyChannel,
    emptyQueue,
    error,
    playerError,
    playerSkip,
    playerStart,
] as PlayerEvent[];
