import { Parameters } from "@storybook/react"
import * as React from "react"
import { withPerformance } from "storybook-addon-performance"

/**
 * Add global context for RTL-LTR switching
 */
export const globalTypes = {
    direction: {
        name: "Direction",
        description: "Direction for layout",
        defaultValue: "LTR",
        toolbar: {
            icon: "globe",
            items: ["LTR", "RTL"],
        },
    },
}

export const parameters: Parameters = {
    options: {
        storySort: (a, b) =>
            a[1].kind === b[1].kind
                ? 0
                : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
    },
}

export const decorators = [withPerformance]
