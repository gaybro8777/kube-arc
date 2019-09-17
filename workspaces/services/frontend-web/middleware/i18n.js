export default function ({
    app,
    store
}) {
    app.i18n.locale = store.state.i18n ? store.state.i18n.locale : "de";
}
