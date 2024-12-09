import {useContext, type RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"

import {openFile} from "@aniojs-private/node-async-sync-fs/sync"

import {randomUUID} from "node:crypto"
import path from "node:path"
import os from "node:os"

export function implementation(
	wrapped_context: RuntimeWrappedContextInstance,
	file_extension?: string,
	tmp_dir?: string
) : string {
	const context = useContext(wrapped_context, 0)

	if (tmp_dir === undefined) {
		tmp_dir = os.tmpdir()
	}

	context.log.trace(`using tmp_dir '${tmp_dir}'`)

	if (file_extension === undefined) {
		file_extension = ""
	}

	const rand = randomUUID({disableEntropyCache: true})
	const file_path = path.join(tmp_dir, rand + file_extension)

	const file = openFile(file_path, "wx", 0o744)

	file.close()

	return file_path
}
