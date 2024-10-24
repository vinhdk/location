import { HttpSuccessStatusEnum } from '../enums';
import { SafeAny, SuccessResponse } from '../types';

export class HttpSuccess<TData, TMetadata extends SafeAny = SafeAny> {
  public constructor(
    public data: TData,
    public status: HttpSuccessStatusEnum,
    public metadata?: TMetadata
  ) {}
}

function createSuccessResponse<TData, TMetadata extends SafeAny = SafeAny>(
  response: SuccessResponse<TData, TMetadata>
): HttpSuccess<TData, TMetadata> {
  return new HttpSuccess<TData, TMetadata>(
    response.data,
    response.status,
    response.metadata as TMetadata
  );
}

function createContinueResponse<TData, TMetadata extends SafeAny = SafeAny>(
  data: TData,
  metadata?: TMetadata
): HttpSuccess<TData, TMetadata> {
  return new HttpSuccess<TData, TMetadata>(
    data,
    HttpSuccessStatusEnum.Continue,
    metadata
  );
}

function createSwitchingProtocolsResponse<
  TData,
  TMetadata extends SafeAny = SafeAny
>(data: TData, metadata?: TMetadata): HttpSuccess<TData, TMetadata> {
  return new HttpSuccess<TData, TMetadata>(
    data,
    HttpSuccessStatusEnum.SwitchingProtocols,
    metadata
  );
}

function createProcessingResponse<TData, TMetadata extends SafeAny = SafeAny>(
  data: TData,
  metadata?: TMetadata
): HttpSuccess<TData, TMetadata> {
  return new HttpSuccess<TData, TMetadata>(
    data,
    HttpSuccessStatusEnum.Processing,
    metadata
  );
}

function createEarlyHintsResponse<TData, TMetadata extends SafeAny = SafeAny>(
  data: TData,
  metadata?: TMetadata
): HttpSuccess<TData, TMetadata> {
  return new HttpSuccess<TData, TMetadata>(
    data,
    HttpSuccessStatusEnum.EarlyHints,
    metadata
  );
}

function createOkResponse<TData, TMetadata extends SafeAny = SafeAny>(
  data: TData,
  metadata?: TMetadata
): HttpSuccess<TData, TMetadata> {
  return new HttpSuccess<TData, TMetadata>(
    data,
    HttpSuccessStatusEnum.Ok,
    metadata
  );
}

function createCreatedResponse<TData, TMetadata extends SafeAny = SafeAny>(
  data: TData,
  metadata?: TMetadata
): HttpSuccess<TData, TMetadata> {
  return new HttpSuccess<TData, TMetadata>(
    data,
    HttpSuccessStatusEnum.Created,
    metadata
  );
}

function createAcceptedResponse<TData, TMetadata extends SafeAny = SafeAny>(
  data: TData,
  metadata?: TMetadata
): HttpSuccess<TData, TMetadata> {
  return new HttpSuccess<TData, TMetadata>(
    data,
    HttpSuccessStatusEnum.Accepted,
    metadata
  );
}

function createNonAuthoritativeInformationResponse<
  TData,
  TMetadata extends SafeAny = SafeAny
>(data: TData, metadata?: TMetadata): HttpSuccess<TData, TMetadata> {
  return new HttpSuccess<TData, TMetadata>(
    data,
    HttpSuccessStatusEnum.NonAuthoritativeInformation,
    metadata
  );
}

function createNoContentResponse<TMetadata extends SafeAny = SafeAny>(
  metadata?: TMetadata
): HttpSuccess<null, TMetadata> {
  return new HttpSuccess<null, TMetadata>(
    null,
    HttpSuccessStatusEnum.NoContent,
    metadata
  );
}

function createResetContentResponse<TMetadata extends SafeAny = SafeAny>(
  metadata?: TMetadata
): HttpSuccess<null, TMetadata> {
  return new HttpSuccess<null, TMetadata>(
    null,
    HttpSuccessStatusEnum.ResetContent,
    metadata
  );
}

function createPartialContentResponse<
  TData,
  TMetadata extends SafeAny = SafeAny
>(data: TData, metadata?: TMetadata): HttpSuccess<TData, TMetadata> {
  return new HttpSuccess<TData, TMetadata>(
    data,
    HttpSuccessStatusEnum.PartialContent,
    metadata
  );
}

function createMultiStatusResponse<TData, TMetadata extends SafeAny = SafeAny>(
  data: TData,
  metadata?: TMetadata
): HttpSuccess<TData, TMetadata> {
  return new HttpSuccess<TData, TMetadata>(
    data,
    HttpSuccessStatusEnum.MultiStatus,
    metadata
  );
}

function createAlreadyReportedResponse<
  TData,
  TMetadata extends SafeAny = SafeAny
>(data: TData, metadata?: TMetadata): HttpSuccess<TData, TMetadata> {
  return new HttpSuccess<TData, TMetadata>(
    data,
    HttpSuccessStatusEnum.AlreadyReported,
    metadata
  );
}

function createImUsedResponse<TData, TMetadata extends SafeAny = SafeAny>(
  data: TData,
  metadata?: TMetadata
): HttpSuccess<TData, TMetadata> {
  return new HttpSuccess<TData, TMetadata>(
    data,
    HttpSuccessStatusEnum.ImUsed,
    metadata
  );
}

function createMultipleChoicesResponse<
  TData,
  TMetadata extends SafeAny = SafeAny
>(data: TData, metadata?: TMetadata): HttpSuccess<TData, TMetadata> {
  return new HttpSuccess<TData, TMetadata>(
    data,
    HttpSuccessStatusEnum.MultipleChoices,
    metadata
  );
}

function createMovedPermanentlyResponse<TMetadata extends SafeAny = SafeAny>(
  metadata?: TMetadata
): HttpSuccess<null, TMetadata> {
  return new HttpSuccess<null, TMetadata>(
    null,
    HttpSuccessStatusEnum.MovedPermanently,
    metadata
  );
}

function createFoundResponse<TMetadata extends SafeAny = SafeAny>(
  metadata?: TMetadata
): HttpSuccess<null, TMetadata> {
  return new HttpSuccess<null, TMetadata>(
    null,
    HttpSuccessStatusEnum.Found,
    metadata
  );
}

function createSeeOtherResponse<TMetadata extends SafeAny = SafeAny>(
  metadata?: TMetadata
): HttpSuccess<null, TMetadata> {
  return new HttpSuccess<null, TMetadata>(
    null,
    HttpSuccessStatusEnum.SeeOther,
    metadata
  );
}

function createNotModifiedResponse<TMetadata extends SafeAny = SafeAny>(
  metadata?: TMetadata
): HttpSuccess<null, TMetadata> {
  return new HttpSuccess<null, TMetadata>(
    null,
    HttpSuccessStatusEnum.NotModified,
    metadata
  );
}

function createUseProxyResponse<TMetadata extends SafeAny = SafeAny>(
  metadata?: TMetadata
): HttpSuccess<null, TMetadata> {
  return new HttpSuccess<null, TMetadata>(
    null,
    HttpSuccessStatusEnum.UseProxy,
    metadata
  );
}

function createUnusedResponse<TMetadata extends SafeAny = SafeAny>(
  metadata?: TMetadata
): HttpSuccess<null, TMetadata> {
  return new HttpSuccess<null, TMetadata>(
    null,
    HttpSuccessStatusEnum.Unused,
    metadata
  );
}

function createTemporaryRedirectResponse<TMetadata extends SafeAny = SafeAny>(
  metadata?: TMetadata
): HttpSuccess<null, TMetadata> {
  return new HttpSuccess<null, TMetadata>(
    null,
    HttpSuccessStatusEnum.TemporaryRedirect,
    metadata
  );
}

function createPermanentRedirectResponse<TMetadata extends SafeAny = SafeAny>(
  metadata?: TMetadata
): HttpSuccess<null, TMetadata> {
  return new HttpSuccess<null, TMetadata>(
    null,
    HttpSuccessStatusEnum.PermanentRedirect,
    metadata
  );
}

export const HttpSuccessOperators = {
  createSuccessResponse,
  createContinueResponse,
  createSwitchingProtocolsResponse,
  createProcessingResponse,
  createEarlyHintsResponse,
  createOkResponse,
  createCreatedResponse,
  createAcceptedResponse,
  createNonAuthoritativeInformationResponse,
  createNoContentResponse,
  createResetContentResponse,
  createPartialContentResponse,
  createMultiStatusResponse,
  createAlreadyReportedResponse,
  createImUsedResponse,
  createMultipleChoicesResponse,
  createMovedPermanentlyResponse,
  createFoundResponse,
  createSeeOtherResponse,
  createNotModifiedResponse,
  createUseProxyResponse,
  createUnusedResponse,
  createTemporaryRedirectResponse,
  createPermanentRedirectResponse,
};
