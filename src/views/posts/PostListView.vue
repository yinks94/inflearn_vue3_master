<template>
  <div>
    <h2>게시글 목록</h2>

    <hr class="my-4" />
    <PostFilter
      v-model:title="params.title_like"
      v-model:limit="params._limit"
    />
    <hr class="my-4" />
    <AppLoading v-if="loading" />
    <AppError v-else-if="error" :message="error.message" />
    <template v-else>
      <AppGrid :items="posts">
        <template v-slot="{ item }">
          <PosItem
            :id="item.id"
            :title="item.title"
            :content="item.content"
            :createdAt="item.createdAt"
            @click="goPage(item.id)"
            @modal="openModal(item)"
          ></PosItem>
        </template>
      </AppGrid>
      <AppPagination
        :current-page="params._page"
        :page-count="pageCount"
        @page="page => (params._page = page)"
      />
    </template>
    <Teleport to="#modal">
      <PostModal
        v-model="show"
        :title="modalTitle"
        :content="modalContent"
        :created-at="modalCreatedAt"
      />
    </Teleport>

    <template v-if="posts && posts.length > 0">
      <hr class="my-5" />
      <AppCard>
        <PostDetailView :id="posts[0].id + ''"></PostDetailView>
      </AppCard>
    </template>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { computed, ref, watchEffect } from 'vue'
import { getPosts } from '@/api/posts'
import { useAlert } from '@/composables/alert'
import PosItem from '@/components/posts/PosItem.vue'
import PostModal from '@/components/posts/PostModal.vue'
import PostFilter from '@/components/posts/PostFilter.vue'
import PostDetailView from '@/views/posts/PostDetailView.vue'
import AppLoading from '@/components/app/AppLoading.vue'
import AppError from '@/components/app/AppError.vue'
import { useAxios } from '@/composables/useAxios'

const router = useRouter()
const { vAlert, vSuccess } = useAlert()

const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _page: 1,
  _limit: 6,
  title_like: '',
})

const { response, data: posts, error, loading } = useAxios('/posts', { params })

// pagination
const totalCount = computed(() => response.value.headers['x-total-count'])
const pageCount = computed(() =>
  Math.ceil(totalCount.value / params.value._limit),
)

const goPage = id => {
  // router.push(`/posts/${id}`)
  router.push({
    name: 'PostDetail',
    params: {
      id,
    },
  })
}

// model
const show = ref(false)

const modalTitle = ref('')
const modalContent = ref('')
const modalCreatedAt = ref('')

const openModal = ({ title, content, createdAt }) => {
  show.value = true
  modalTitle.value = title
  modalContent.value = content
  modalCreatedAt.value = createdAt
}

const closeModal = () => {
  show.value = false
}
</script>

<style lang="scss" scoped></style>
