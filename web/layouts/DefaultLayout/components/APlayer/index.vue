<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import axios from 'axios';
import { MusicBar } from "@/components/MusicBar";
import { IconSvg } from "@/components/IconSvg";
interface Props {
	mini?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
	mini: false
});

// 音频是否播放
const played = ref(false);
// 音频播放器
let ap: any = null;
// 设置音频播放器
const setAP = async (i = 0) => {
  if(ap) {
    return;
  }
  const url = window.APlayer_config_urls[i] || '';
  if(url === '') {
    return;
  }

  try {
    const response = await axios.get(url);
    // console.log('response', response);
    const rData = response.data || {};
    const data = rData.data || {};
    const autoplay = typeof data.autoplay === 'undefined' ? false : data.autoplay;

    ap = new window.APlayer({
      container: document.getElementById('lqsblog-aplayer'),
      mini: true,
      autoplay,
      order: data.order || 'random',
      audio: data.audio || []
    });
    // console.log("ap", ap)
    // 事件绑定
    ap.on('play', function () {
      // 播放音乐
      played.value = true;
    });
    ap.on('pause', function () {
      // 暂停音乐
      played.value = false;
    });
    // 赋值
    played.value = ap.paused === false;
  } catch (error) {
    console.error(error);

    setAP(i + 1);
  }

}
onMounted(()=> {
 setAP();
})
onUnmounted(()=> {
  // 销毁播放器
  ap?.destroy();
})

// 暂停
const onPaused = () => {
  ap?.pause();
}
// 上一首
const onSkipBack = ()=> {
  ap?.skipBack()
}
// 下一首
const onSkipForward = ()=> {
  ap?.skipForward()
}
</script>
<template>
 <div class="lqsblog-aplayer-box" :class="{'mini': props.mini === true, 'paused': played === false}">
    <div id="lqsblog-aplayer">
      <div class="el-loading-spinner"><svg class="circular" viewBox="0 0 50 50"><circle class="path" cx="25" cy="25" r="20" fill="none"></circle></svg></div>
    </div>
    <div v-if="played" class="bar" @click="onPaused">
      <MusicBar />
    </div>
    <div class="lqsblog-aplayer-pre" @click="onSkipBack">
      <IconSvg class="icon" name="arrow-left" />
    </div>
    <div class="lqsblog-aplayer-next" @click="onSkipForward">
      <IconSvg class="icon" name="arrow-left" />
    </div>
  </div>
</template>
<style lang="scss">
  @keyframes lqsblog-aplayer-rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .lqsblog-aplayer-box{
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #fff;
    transition:  0.3s;
    transition-property: width,height;
    #lqsblog-aplayer {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      margin: 0;
      border-radius: 50%;
      overflow: hidden;
      // 播放旋转
      animation: lqsblog-aplayer-rotate 10s linear infinite;

      .aplayer-body,
      .aplayer-pic {
        width: 100%;
        height: 100%;
        background-position: center;
        .aplayer-pause,
        .aplayer-notice {
         display: none;
        }
      }
    }

    .bar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .lqsblog-aplayer-pre,
    .lqsblog-aplayer-next {
      position: absolute;
      left: 25px;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 70px;
      height: 120px;
      font-size: 60px;
      color: #fff;
      cursor: pointer;
      opacity: 0;
      transition: 0.5s;
      transition-property: left,opacity;
      &:hover {
        .icon {
           opacity: 0.8;
        }
      }
    }
    .lqsblog-aplayer-next {
      .icon {
         transform: rotate(180deg);
      }
    }

    &:hover {
      .lqsblog-aplayer-pre,
      .lqsblog-aplayer-next {
        opacity: 1;
        left: -70px;
      }
      .lqsblog-aplayer-next {
        left: 120px;
      }
    }

    &.mini {
      width: 60px;
      height: 60px;
      .bar {
        transform: scale(0.5);
        transform-origin: center;
      }

      .lqsblog-aplayer-pre,
      .lqsblog-aplayer-next {
        left: 12.5px;
        width: 35px;
        height: 60px;
        font-size: 30px;
      }

       &:hover {
        .lqsblog-aplayer-pre {
          left: -35px;
        }
        .lqsblog-aplayer-next {
          left: 60px;
        }
      }
    }

     // 暂停
     &.paused {
        #lqsblog-aplayer {
          animation-play-state: paused !important;
        }
        .bar {
          display: none;
        }
      }
  }
</style>
