module.exports = {
    "presets": [
        ["@babel/env", {
            "targets": { "node": "current" }
        }],
        "@babel/react",
        ["@babel/stage-2", {
            "decoratorsLegacy": true
        }],
    ]
}
