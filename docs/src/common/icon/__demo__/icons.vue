<template>
	<div class="icon-demo">
		<fk-tooltip v-for="icon in icons" :key="icon.name" :content="icon.name">
			<div class="icon" @click="handleCopy(icon.name)">
				<component :is="icon" />
				<span class="icon-name">{{ icon.name.replace('Icon', '') }}</span>
			</div>
		</fk-tooltip>
	</div>
	<p>总共 {{ icons.length }} 个</p>
</template>

<script setup lang="ts">
import { Message, clipboard } from '@erp/common';

import {
	IconAlignCenter,
	IconAlignLeft,
	IconAlignRight,
	IconAlipayCircle,
	IconApps,
	IconArchive,
	IconArrowDown,
	IconArrowFall,
	IconArrowLeft,
	IconArrowRight,
	IconArrowRise,
	IconArrowUp,
	IconAt,
	IconAttachment,
	IconBackward,
	IconBarChart,
	IconBgColors,
	IconBold,
	IconBook,
	IconBookmark,
	IconBranch,
	IconBrush,
	IconBug,
	IconBulb,
	IconCalendar,
	IconCalendarClock,
	IconCamera,
	IconCaretDown,
	IconCaretLeft,
	IconCaretRight,
	IconCaretUp,
	IconCheck,
	IconCheckCircle,
	IconCheckCircleFill,
	IconCheckSquare,
	IconChineseFill,
	IconClockCircle,
	IconClose,
	IconCloseCircle,
	IconCloseCircleFill,
	IconCloud,
	IconCloudDownload,
	IconCode,
	IconCodeBlock,
	IconCodeSandbox,
	IconCodeSquare,
	IconCodepen,
	IconCommand,
	IconCommon,
	IconCompass,
	IconComputer,
	IconCopy,
	IconCopyright,
	IconCustomerService,
	IconDashboard,
	IconDelete,
	IconDesktop,
	IconDice,
	IconDoubleDown,
	IconDoubleLeft,
	IconDoubleRight,
	IconDoubleUp,
	IconDown,
	IconDownCircle,
	IconDownload,
	IconDragArrow,
	IconDragDot,
	IconDragDotVertical,
	IconDriveFile,
	IconEar,
	IconEdit,
	IconEmail,
	IconEmpty,
	IconEnglishFill,
	IconEraser,
	IconExclamation,
	IconExclamationCircle,
	IconExclamationCircleFill,
	IconExclamationPolygonFill,
	IconExpand,
	IconExperiment,
	IconExport,
	IconEye,
	IconEyeInvisible,
	IconFaceBookCircleFill,
	IconFaceFrownFill,
	IconFaceMehFill,
	IconFaceSmileFill,
	IconFacebook,
	IconFacebookSquareFill,
	IconFile,
	IconFileAudio,
	IconFileImage,
	IconFilePdf,
	IconFileVideo,
	IconFilter,
	IconFindReplace,
	IconFire,
	IconFolder,
	IconFolderAdd,
	IconFolderDelete,
	IconFontColors,
	IconFormula,
	IconForward,
	IconFullscreen,
	IconFullscreenExit,
	IconGift,
	IconGithub,
	IconGitlab,
	IconGoogle,
	IconGoogleCircleFill,
	IconH1,
	IconH2,
	IconH3,
	IconH4,
	IconH5,
	IconH6,
	IconH7,
	IconHeart,
	IconHeartFill,
	IconHighlight,
	IconHistory,
	IconHome,
	IconIdcard,
	IconImage,
	IconImageClose,
	IconImport,
	IconInfo,
	IconInfoCircle,
	IconInfoCircleFill,
	IconInteraction,
	IconItalic,
	IconLanguage,
	IconLaunch,
	IconLayers,
	IconLayout,
	IconLeft,
	IconLeftCircle,
	IconLineHeight,
	IconLink,
	IconList,
	IconLiveBroadcast,
	IconLoading,
	IconLocation,
	IconLock,
	IconLoop,
	IconMan,
	IconMenu,
	IconMenuFold,
	IconMenuUnfold,
	IconMessage,
	IconMessageBanned,
	IconMindMapping,
	IconMinus,
	IconMinusCircle,
	IconMinusCircleFill,
	IconMobile,
	IconMoon,
	IconMoonFill,
	IconMore,
	IconMoreVertical,
	IconMosaic,
	IconMusic,
	IconMute,
	IconMuteFill,
	IconNav,
	IconNotification,
	IconNotificationClose,
	IconObliqueLine,
	IconOrderedList,
	IconOriginalSize,
	IconPalette,
	IconPaste,
	IconPause,
	IconPauseCircle,
	IconPauseCircleFill,
	IconPen,
	IconPenFill,
	IconPhone,
	IconPlayArrow,
	IconPlayArrowFill,
	IconPlayCircle,
	IconPlayCircleFill,
	IconPlus,
	IconPlusCircle,
	IconPlusCircleFill,
	IconPoweroff,
	IconPrinter,
	IconPublic,
	IconPushpin,
	IconQq,
	IconQqCircleFill,
	IconQqZone,
	IconQrcode,
	IconQuestion,
	IconQuestionCircle,
	IconQuestionCircleFill,
	IconQuote,
	IconRecord,
	IconRecordStop,
	IconRedo,
	IconRefresh,
	IconRelation,
	IconReply,
	IconRight,
	IconRightCircle,
	IconRobot,
	IconRobotAdd,
	IconRotateLeft,
	IconRotateRight,
	IconSafe,
	IconSave,
	IconScan,
	IconSchedule,
	IconScissor,
	IconSearch,
	IconSelectAll,
	IconSend,
	IconSettings,
	IconShake,
	IconShareAlt,
	IconShareExternal,
	IconShareInternal,
	IconShrink,
	IconSkin,
	IconSkipNext,
	IconSkipNextFill,
	IconSkipPrevious,
	IconSkipPreviousFill,
	IconSort,
	IconSortAscending,
	IconSortDescending,
	IconSound,
	IconSoundFill,
	IconStamp,
	IconStar,
	IconStarFill,
	IconStop,
	IconStorage,
	IconStrikethrough,
	IconSubscribe,
	IconSubscribeAdd,
	IconSubscribed,
	IconSun,
	IconSunFill,
	IconSwap,
	IconSync,
	IconTag,
	IconTags,
	IconThumbDown,
	IconThumbDownFill,
	IconThumbUp,
	IconThumbUpFill,
	IconThunderbolt,
	IconToBottom,
	IconToLeft,
	IconToRight,
	IconToTop,
	IconTool,
	IconTranslate,
	IconTrophy,
	IconTwitter,
	IconTwitterCircleFill,
	IconUnderline,
	IconUndo,
	IconUnlock,
	IconUnorderedList,
	IconUp,
	IconUpCircle,
	IconUpload,
	IconUser,
	IconUserAdd,
	IconUserGroup,
	IconVideoCamera,
	IconVoice,
	IconWechat,
	IconWechatpay,
	IconWeibo,
	IconWeiboCircleFill,
	IconWifi,
	IconWoman,
	IconZoomIn,
	IconZoomOut,
} from '@erp/icons';
const icons = [
	IconArrowDown,
	IconArrowFall,
	IconArrowLeft,
	IconArrowRight,
	IconArrowRise,
	IconArrowUp,
	IconCaretDown,
	IconCaretLeft,
	IconCaretRight,
	IconCaretUp,
	IconDoubleDown,
	IconDoubleLeft,
	IconDoubleRight,
	IconDoubleUp,
	IconDownCircle,
	IconDown,
	IconDragArrow,
	IconExpand,
	IconLeftCircle,
	IconLeft,
	IconMenuFold,
	IconMenuUnfold,
	IconRightCircle,
	IconRight,
	IconRotateLeft,
	IconRotateRight,
	IconShrink,
	IconSwap,
	IconToBottom,
	IconToLeft,
	IconToRight,
	IconToTop,
	IconUpCircle,
	IconUp,
	IconCheckCircleFill,
	IconCloseCircleFill,
	IconExclamationCircleFill,
	IconExclamationPolygonFill,
	IconInfoCircleFill,
	IconMinusCircleFill,
	IconPlusCircleFill,
	IconQuestionCircleFill,
	IconCheckCircle,
	IconCheckSquare,
	IconCheck,
	IconClockCircle,
	IconCloseCircle,
	IconClose,
	IconExclamationCircle,
	IconExclamation,
	IconInfoCircle,
	IconInfo,
	IconMinusCircle,
	IconMinus,
	IconPlusCircle,
	IconPlus,
	IconQuestionCircle,
	IconQuestion,
	IconStop,
	IconHeartFill,
	IconStarFill,
	IconThumbDownFill,
	IconThumbUpFill,
	IconAt,
	IconCloudDownload,
	IconCodeBlock,
	IconCodeSquare,
	IconCode,
	IconCustomerService,
	IconDownload,
	IconExport,
	IconEyeInvisible,
	IconEye,
	IconHeart,
	IconHistory,
	IconHome,
	IconImport,
	IconLaunch,
	IconList,
	IconMessageBanned,
	IconMessage,
	IconMoreVertical,
	IconMore,
	IconPoweroff,
	IconRefresh,
	IconReply,
	IconSave,
	IconScan,
	IconSearch,
	IconSelectAll,
	IconSend,
	IconSettings,
	IconShareAlt,
	IconShareExternal,
	IconShareInternal,
	IconStar,
	IconSync,
	IconThumbDown,
	IconThumbUp,
	IconTranslate,
	IconUpload,
	IconVoice,
	IconAlignCenter,
	IconAlignLeft,
	IconAlignRight,
	IconAttachment,
	IconBgColors,
	IconBold,
	IconBrush,
	IconCopy,
	IconDelete,
	IconEdit,
	IconEraser,
	IconFilter,
	IconFindReplace,
	IconFontColors,
	IconFormula,
	IconH1,
	IconH2,
	IconH3,
	IconH4,
	IconH5,
	IconH6,
	IconH7,
	IconHighlight,
	IconItalic,
	IconLineHeight,
	IconLink,
	IconObliqueLine,
	IconOrderedList,
	IconOriginalSize,
	IconPaste,
	IconQuote,
	IconRedo,
	IconScissor,
	IconSortAscending,
	IconSortDescending,
	IconSort,
	IconStrikethrough,
	IconUnderline,
	IconUndo,
	IconUnorderedList,
	IconZoomIn,
	IconZoomOut,
	IconMuteFill,
	IconPauseCircleFill,
	IconPlayArrowFill,
	IconPlayCircleFill,
	IconSkipNextFill,
	IconSkipPreviousFill,
	IconSoundFill,
	IconBackward,
	IconForward,
	IconFullscreenExit,
	IconFullscreen,
	IconLiveBroadcast,
	IconMusic,
	IconMute,
	IconPauseCircle,
	IconPause,
	IconPlayArrow,
	IconPlayCircle,
	IconRecordStop,
	IconRecord,
	IconSkipNext,
	IconSkipPrevious,
	IconSound,
	IconFaceBookCircleFill,
	IconFacebookSquareFill,
	IconGoogleCircleFill,
	IconQqCircleFill,
	IconTwitterCircleFill,
	IconWeiboCircleFill,
	IconAlipayCircle,
	IconCodeSandbox,
	IconCodepen,
	IconFacebook,
	IconGithub,
	IconGitlab,
	IconGoogle,
	IconQqZone,
	IconQq,
	IconTwitter,
	IconWechat,
	IconWechatpay,
	IconWeibo,
	IconChineseFill,
	IconEnglishFill,
	IconFaceFrownFill,
	IconFaceMehFill,
	IconFaceSmileFill,
	IconMoonFill,
	IconPenFill,
	IconSunFill,
	IconApps,
	IconArchive,
	IconBarChart,
	IconBook,
	IconBookmark,
	IconBranch,
	IconBug,
	IconBulb,
	IconCalendarClock,
	IconCalendar,
	IconCamera,
	IconCloud,
	IconCommand,
	IconCommon,
	IconCompass,
	IconComputer,
	IconCopyright,
	IconDashboard,
	IconDesktop,
	IconDice,
	IconDragDotVertical,
	IconDragDot,
	IconDriveFile,
	IconEar,
	IconEmail,
	IconEmpty,
	IconExperiment,
	IconFileAudio,
	IconFileImage,
	IconFilePdf,
	IconFileVideo,
	IconFile,
	IconFire,
	IconFolderAdd,
	IconFolderDelete,
	IconFolder,
	IconGift,
	IconIdcard,
	IconImageClose,
	IconImage,
	IconInteraction,
	IconLanguage,
	IconLayers,
	IconLayout,
	IconLoading,
	IconLocation,
	IconLock,
	IconLoop,
	IconMan,
	IconMenu,
	IconMindMapping,
	IconMobile,
	IconMoon,
	IconMosaic,
	IconNav,
	IconNotificationClose,
	IconNotification,
	IconPalette,
	IconPen,
	IconPhone,
	IconPrinter,
	IconPublic,
	IconPushpin,
	IconQrcode,
	IconRelation,
	IconRobotAdd,
	IconRobot,
	IconSafe,
	IconSchedule,
	IconShake,
	IconSkin,
	IconStamp,
	IconStorage,
	IconSubscribeAdd,
	IconSubscribe,
	IconSubscribed,
	IconSun,
	IconTag,
	IconTags,
	IconThunderbolt,
	IconTool,
	IconTrophy,
	IconUnlock,
	IconUserAdd,
	IconUserGroup,
	IconUser,
	IconVideoCamera,
	IconWifi,
	IconWoman,
];
console.log('icons >>', icons);
const handleCopy = (name: string) => {
	const value = `<${name} />`;
	clipboard(value).then(() => {
		Message.success(`复制成功【${value}】`);
	});
};
</script>

<style lang="scss" scoped>
.icon-demo {
	display: grid;
	grid-template-columns: repeat(auto-fill, 60px);
	gap: 8px;
	place-items: center;

	.icon {
		border: 1px solid var(--color-border-1);
		border-radius: var(--border-radius-large);
		background-color: var(--color-fill-1);
		width: 60px;
		height: 60px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 24px;
		cursor: pointer;
		transition: all 200ms linear;
		color: var(--color-text-1);
		position: relative;

		&:hover {
			// font-size: 30px;
			transform: scale(1.1);
			background-color: var(--color-fill-3);

			.icon-name {
				// color: var(--color-text-2);
			}
		}

		.icon-name {
			position: absolute;
			font-size: 11px;
			display: inline-block;
			width: 100%;
			overflow: hidden;
			line-height: 1;
			margin-top: 6px;
			text-align: center;
			color: transparent;
			bottom: 6px;
		}
	}
}
</style>
