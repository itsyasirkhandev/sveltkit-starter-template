// Stub pattern for Firebase Storage uploads and other file-based workflows.
// Flesh this out when the user explicitly asks for file uploads.

export interface FileUploadHandlers<TMeta = unknown> {
	beforeUpload?(file: File): Promise<TMeta> | TMeta;
	onProgress?(progress: number): void; // progress in [0, 100]
	onComplete?(downloadUrl: string, meta: TMeta): void;
	onError?(error: unknown): void;
}
