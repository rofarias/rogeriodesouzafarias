{**
 * templates/controllers/grid/users/chapter/form/chapterForm.tpl
 *
 * Copyright (c) 2014-2020 Simon Fraser University
 * Copyright (c) 2003-2020 John Willinsky
 * Distributed under the GNU GPL v3. For full terms see the file docs/COPYING.
 *
 * Chapters grid form
 *
 *}

<script type="text/javascript">
	// Attach the Information Center handler.
	$(function() {ldelim}
		$('#editChapterForm').pkpHandler(
			'$.pkp.controllers.form.AjaxFormHandler'
		);
	{rdelim});
</script>

<form class="pkp_form" id="editChapterForm" method="post" action="{url router=$smarty.const.ROUTE_COMPONENT component="grid.users.chapter.ChapterGridHandler" op="updateChapter"}">
	{csrf}
	<input type="hidden" name="submissionId" value="{$submissionId|escape}" />
	<input type="hidden" name="publicationId" value="{$publicationId|escape}" />
	<input type="hidden" name="chapterId" value="{$chapterId|escape}" />

	{include file="controllers/notification/inPlaceNotification.tpl" notificationId="chapterFormNotification"}

	{fbvFormSection title="common.title" for="title" required=true}
		{fbvElement type="text" name="title" id="title" value=$title maxlength="255" multilingual=true required=true}
	{/fbvFormSection}

	{fbvFormSection title="metadata.property.displayName.subTitle" for="subTitle"}
		{fbvElement type="text" name="subtitle" id="subtitle" value=$subtitle maxlength="255" multilingual=true}
	{/fbvFormSection}

	{fbvFormSection title="common.abstract" for="abstract"}
	    {fbvElement type="textarea" name="abstract" id="abstract" value=$abstract  rich="extended" multilingual=true}
	{/fbvFormSection}

	{fbvFormSection title="submission.chapter.pages" for="customExtras"}
	    {fbvElement type="text" id="pages" value=$pages inline=true size=$fbvStyles.size.LARGE}
	{/fbvFormSection}

	{if $enableChapterPublicationDates}
		{fbvFormSection title="publication.datePublished" for="customExtras"}
		{fbvElement type="text" id="datePublished" value=$datePublished inline=true size=$fbvStyles.size.LARGE  class="datepicker"}
		{/fbvFormSection}
	{/if}

	{fbvFormSection}
		{assign var="uuid" value=""|uniqid|escape}
		<div id="chapter-authors-{$uuid}">
			<list-panel
				v-bind="components.authors"
				@set="set"
			/>
		</div>
		<script type="text/javascript">
			pkp.registry.init('chapter-authors-{$uuid}', 'Container', {$chapterAuthorsListData|json_encode});
		</script>
	{/fbvFormSection}

	{if $chapterId}
		{fbvFormSection}
			{assign var="uuid" value=""|uniqid|escape}
			<div id="chapter-files-{$uuid}">
				<list-panel
					v-bind="components.chapterFilesListPanel"
					@set="set"
				/>
			</div>
			<script type="text/javascript">
				pkp.registry.init('chapter-files-{$uuid}', 'Container', {$chapterFilesListData|json_encode});
			</script>
		{/fbvFormSection}
	{/if}

	<p><span class="formRequired">{translate key="common.requiredField"}</span></p>
	{fbvFormButtons submitText="common.save"}
</form>
