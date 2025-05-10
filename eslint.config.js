// ESLint의 JavaScript 기본 규칙을 가져옵니다.
import js from '@eslint/js'

// Vue 파일에 대해 ESLint 검사를 수행하기 위한 Vue 전용 플러그인입니다.
import pluginVue from 'eslint-plugin-vue'

// Prettier와의 포맷팅 규칙 충돌을 방지하는 설정을 가져옵니다.
// Prettier는 코드 포맷팅을 담당하고, ESLint는 코드 품질 검사에 집중하도록 설정합니다.
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// ESLint 설정을 배열로 내보냅니다.
export default [
  {
    // Linting을 적용할 파일을 지정하는 설정입니다.
    // 여기서는 모든 .js, .mjs, .jsx, .vue 파일을 대상으로 합니다.
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
    rules: {
      // console.log 사용을 경고 (개발 중에만 허용하고 배포 시 제거 권장)
      'no-console': 'allow',
      // 정의되지 않은 Vue 컴포넌트를 사용하는 것을 방지하는 ESLint 규칙
      'vue/no-undef-components': [
        'error',
        {
          ignorePatterns: ['RouterView', 'RouterLink'],
        },
      ],
    },
  },

  {
    // Linting에서 무시할 파일을 지정하는 설정입니다.
    // dist, dist-ssr, coverage 디렉토리 내의 모든 파일을 Linting에서 제외합니다.
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  // ESLint의 JavaScript 권장 규칙 세트를 적용합니다.
  // 기본적인 JavaScript 코드 품질 유지와 오류 방지를 위한 규칙들이 포함되어 있습니다.
  js.configs.recommended,

  // Vue 필수 규칙 세트를 적용합니다.
  // Vue 파일에서 발생할 수 있는 기본적인 오류와 스타일 문제를 방지하는 필수 규칙들이 포함되어 있습니다.
  ...pluginVue.configs['flat/essential'],

  // 포맷팅 관련 규칙을 비활성화하여 Prettier와 충돌을 방지합니다.
  // 이를 통해 Prettier가 포맷팅을 담당하고, ESLint는 코드 품질 검사에 집중할 수 있습니다.
  skipFormatting,
]
