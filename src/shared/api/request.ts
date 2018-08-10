/**
 *
 * BASIC API to request data
 *
 */

interface DocumentRequestPayload {
	document_objid: number;
}

interface DocumentResponsePayload {
	markdown_content: string;
}

export interface RequestParameters {
	action: 'GET_DOCUMENT';
	payload: DocumentRequestPayload;
}

export const executeRequest = (params: RequestParameters): DocumentResponsePayload => {
	return {
		markdown_content: '1'
	};
};
