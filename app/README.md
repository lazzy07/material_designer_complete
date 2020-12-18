# Scss watch

To install scss compiler use

```
npm install -g scss
```

(if you dont want to install as a global dependency use the below command)

```
npm install --save-dev scss
```

```
sass --watch src/scss:src/css
```

"electron-builder": "^20.38.5",
"three": "^0.101.1",
"rete-comment-plugin": "^0.5.1",

# Node bindings folder copy

```
cpx -C node_bindings node_modules/node-bindings
```

# Store compilation

To compile store, use the following command inside store folder (Must have typescript installed)

```
tsc --watch
```

# Screen layout data will follow the following protocol

```tsx
let screenLayout: ScreenLayoutElement[][] = [
  //This array contains all the windows
  [
    //This window contains all vertical window elements
    {
      direction: "vertical",
      flex: 0.1,
      component: true,
      type: "EDITOR_SCREEN"
    }
  ]
];
```

<ReflexContainer orientation="vertical">
            <ReflexElement flex={0.2}>
              <Library />
            </ReflexElement>
            <ReflexSplitter
              style={{
                height: this.state.dimensions.height,
                borderRight: `1px solid ${SLIDERS_COLOR}`,
                borderLeft: `1px solid ${SLIDERS_COLOR}`,
                zIndex: 0
              }}
            />
            <ReflexElement flex={0.6}>
              <ReflexContainer
                orientation="horizontal"
                style={{ height: this.state.dimensions.height }}
              >
                <ReflexElement flex={0.4}>
                  <ReflexContainer orientation="vertical">
                    <ReflexElement flex={0.5}>
                      <GraphicsEngine />
                    </ReflexElement>
                    <ReflexElement flex={0.5}>
                      <ImageVisalizer />
                    </ReflexElement>
                  </ReflexContainer>
                </ReflexElement>
                <ReflexElement flex={0.6} propagateDimensions>
                  <Engine />
                </ReflexElement>
              </ReflexContainer>
            </ReflexElement>
            <ReflexSplitter
              style={{
                height: this.state.dimensions.height,
                borderRight: `1px solid ${SLIDERS_COLOR}`,
                borderLeft: `1px solid ${SLIDERS_COLOR}`,
                zIndex: 0
              }}
            />
            <ReflexElement flex={0.2}>
              <PropertiesEditor />
            </ReflexElement>
          </ReflexContainer>

## Requirements

windows-build-tools (For windows)
cmake
