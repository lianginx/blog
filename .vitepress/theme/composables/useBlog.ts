import type { TagItem } from '#types'
import { data as blogsRaw } from '#data/blog.data'

interface UseBlogOptions {
  limit?: number
}

export function useBlog({ limit }: UseBlogOptions = {}) {
  const keywords = ref('')
  const currentTag = ref('')

  const tags = computed<TagItem[]>(() => {
    const tagsSet: TagItem[] = []
    blogsRaw.forEach((blog) => {
      blog.frontmatter.tags?.forEach((tag) => {
        const existTagItem = tagsSet.find(o => o.name === tag)
        if (existTagItem) {
          existTagItem.count++
          return
        }
        tagsSet.push({ name: tag, count: 1 })
      })
    })
    return tagsSet.sort((a, b) => b.count - a.count)
  })

  const blogs = computed(() => {
    let nextBlogs = [...blogsRaw]

    if (limit) {
      nextBlogs = nextBlogs.slice(0, limit)
    }

    if (keywords.value) {
      nextBlogs = nextBlogs.filter(blog =>
        blog.frontmatter.title
          .toLowerCase()
          .includes(keywords.value),
      )
    }

    if (currentTag.value) {
      nextBlogs = nextBlogs
        .filter(blog => blog.frontmatter.tags?.includes(currentTag.value))
    }

    return nextBlogs
  })

  function clearKeywords() {
    keywords.value = ''
  }

  function clearCurrentTag() {
    currentTag.value = ''
  }

  return {
    keywords,
    currentTag,
    tags,
    blogs,
    clearKeywords,
    clearCurrentTag,
  }
}
