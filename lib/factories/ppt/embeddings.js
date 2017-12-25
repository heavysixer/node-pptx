class EmbeddingsFactory {
    constructor(parentFactory, args) {
        this.parentFactory = parentFactory;
        this.content = parentFactory.content;
        this.args = args;
    }

    build() {
        // TODO: for now we don't have anything to load from our stubs, but leaving this here for the future...
    }

    addExcelEmbed(worksheetName, workbookContentZipBinary) {
        this.content[`ppt/embeddings/${worksheetName}`] = workbookContentZipBinary;
    }
}

module.exports.EmbeddingsFactory = EmbeddingsFactory;
