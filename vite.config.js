
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from "unplugin-auto-import/vite"
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { VarletUIResolver } from 'unplugin-vue-components/resolvers'
//图标
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
//svg
import path from 'path'
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
		vue(),
		 createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]",
    }),
	Components({
		resolvers: [ElementPlusResolver(),
			VarletUIResolver(),
		  // 自动导入图标组件
        IconsResolver({
          // @iconify-json/ep 是 Element Plus 的图标库
          enabledCollections: ['ep']
        })],
	}),
	AutoImport({
		resolvers: [ElementPlusResolver(),
			VarletUIResolver(),IconsResolver({
			prefix:'Icon'
		})],
	}),
	Icons({
		autoInstall:true
	})
  ],
  resolve: {
	  alias: {
		  '@': fileURLToPath(new URL('./src',
			  import.meta.url))
	  }
  },
})
