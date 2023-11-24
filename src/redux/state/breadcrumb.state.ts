export interface BreadcrumbState
{
    items: {
        caption: string
        url: string
        iconType: `action` | `condition` | `content` | `language-content` | `event` | `mission` | `objective` | `resource` | `timer` | `train` | `trigger`
    }[]
}