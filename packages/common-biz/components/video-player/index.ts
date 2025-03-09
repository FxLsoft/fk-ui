import { pop } from '../pop';
import _VideoPlayer from './VideoPlayer.vue';
import type { VideoPlayerProps } from './interface';

export const VideoPlayer = _VideoPlayer;

export * from './interface';

/**
 *
 * @param props VideoPlayerProps
 * @returns
 */
export function createVideoPlayerPop(props: VideoPlayerProps) {
	return pop.createModal(_VideoPlayer, props, {
		hideTitle: false,
		footer: false,
		maskClosable: false,
		draggable: true,
		bodyStyle: 'padding: 0',
		modalClass: 'video-player-pop',
	});
}
